import React, { useState, useEffect, useRef } from "react";
import "reset-css";
import { shuffle, sortBy } from "lodash";
// import { graphql } from "gatsby";
import classnames from "classnames";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import ClickableBox from "clickable-box";
import designerData from '../data/designerData';
import categories from "../categories";
import Profile from "../components/profile";
import Layout from "../components/layout";
import FilterItem from "../components/filter-item";
import Nav from "../components/nav";
import Loader from "../components/loader";
import paginate from "../paginate";
import "@reach/dialog/styles.css";
import styles from "./index.module.scss";
import CloseIcon from "../icons/close";
import FilterIcon from "../icons/filter";
import Button from "../components/button";

// const capitalize = (s) => {
//   if (typeof s !== "string") return "";
//   return s.charAt(0).toUpperCase() + s.slice(1);
// };

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleDesigners, setVisibleDesigners] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  const [isFilterListVisible, setIsFilterListVisible] = useState(false);

  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  const [currentPage, setCurrentPage] = useState(1);

  const profileContainerRef = useRef();

  const filterCategoryTypes = [
    { name: "Expertise", id: "expertise" },
    { name: "Location", id: "location" },
  ];

  function filterItemOnChange(e, section) {
    const categoryId = e.target.value;
    const isChecked = e.target.checked;

    const newSelectedFilters = selectedFilters[section.id] || [];

    if (isChecked) {
      newSelectedFilters.push(categoryId);
    } else {
      const i = newSelectedFilters.indexOf(categoryId);

      newSelectedFilters.splice(i, 1);
    }

    setSelectedFilters({
      ...selectedFilters,
      [section.id]: newSelectedFilters,
    });
    setCurrentPage(1);
  }

  useEffect(() => {
    const shuffledDesigners = shuffle(designerData);
    setVisibleDesigners(shuffledDesigners);
    setIsLoading(false);
  }, []);

  const numDesignersPerPage = 52;
  const numPagesToShowInPagination = 5;

  const isNoFilterApplied = Object.entries(selectedFilters).every(
    (category) => {
      const [, value] = category;
      return value.length === 0;
    }
  );

  const filteredDesigners = isNoFilterApplied
    ? visibleDesigners
    : visibleDesigners.filter((designer) => {
        // A profile should appear if they have at least one tag within each
        // section.
        return Object.entries(selectedFilters).every((category) => {
          const [categoryName, categoryValue] = category;

          if (categoryValue.length === 0) {
            return true;
          }

          return categoryValue.some((filter) => {
            return designer.profile[categoryName].includes(filter);
          });
        });
      });

  const pagination = paginate(
    filteredDesigners.length,
    currentPage,
    numDesignersPerPage,
    numPagesToShowInPagination
  );

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Nav
            filter
            theme="dark"
            toggleFilterList={() => {
              setIsFilterListVisible(!isFilterListVisible);
            }}
            isLoading={false}
          />

          <div
            className={classnames({
              [styles.filterContainer]: true,
              [styles.filterListVisible]: isFilterListVisible,
            })}
          >
            {filterCategoryTypes.map((section) => {
              const categoriesInSection = categories.filter(
                (c) => c[section.id]
              );
              const sortedCategoriesInSection = sortBy(
                categoriesInSection,
                (category) => category.title
              );
              return (
                <div key={section.id}>
                  <h3 className={styles.filterCategoryTitle}>{section.name}</h3>
                  {sortedCategoriesInSection.map((category) => (
                    <FilterItem
                      key={category.id}
                      id={category.id}
                      type="row"
                      onChange={(e) => {
                        filterItemOnChange(e, section);
                      }}
                      isChecked={
                        selectedFilters[section.id]?.includes(category.id) ||
                        false
                      }
                      className={styles.filterItemInput}
                      title={category.title}
                      count={category.totalCount}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={classnames({
            [styles.main]: true,
            [styles.slide]: isFilterListVisible,
          })}
          ref={profileContainerRef}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <div className={styles.profiles}>
                {filteredDesigners.map((designer, i) => {
                  if (i < pagination.startIndex || i > pagination.endIndex) {
                    return null;
                  }

                  return (
                    <Profile
                      image={designer.profile.profile_image_url_https}
                      fluid=''
                      name={designer.profile.name}
                      description={designer.profile.description}
                      location={designer.profile.location || "N/A"}
                      hex={`#${designer.profile.profile_link_color}`}
                      key={designer.profile.name}
                      contrast={designer.profile.contrast}
                      displayUrl={designer.profile.display_url}
                      expandedUrl={designer.profile.expanded_url}
                      handle={designer.profile.screen_name}
                    />
                  );
                })}
              </div>

              {filteredDesigners.length > 0 ? (
                <>
                  <div className={styles.paginationContainer}>
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage - 1);
                        profileContainerRef.current.scrollTo(0, 0);
                      }}
                      disabled={pagination.currentPage === pagination.startPage}
                      type="button"
                      className={styles.paginationArrow}
                    >
                      ←
                    </button>
                    <button
                      className={styles.pageNumberButton}
                      onClick={() => {
                        setCurrentPage(1);
                        profileContainerRef.current.scrollTo(0, 0);
                      }}
                      type="button"
                      disabled={pagination.currentPage === 1}
                    >
                      1
                    </button>
                    {currentPage >= numPagesToShowInPagination && <>&hellip;</>}
                    {pagination.pages.map((pageNumber) => {
                      // Skip over these page numbers because they'll always appear
                      // in the pagination.
                      if (
                        pageNumber === 1 ||
                        pageNumber === pagination.totalPages
                      ) {
                        return null;
                      }

                      return (
                        <button
                          key={pageNumber}
                          className={styles.pageNumberButton}
                          onClick={() => {
                            setCurrentPage(pageNumber);
                            profileContainerRef.current.scrollTo(0, 0);
                          }}
                          disabled={pagination.currentPage === pageNumber}
                          type="button"
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                    {currentPage <=
                      pagination.totalPages -
                        (numPagesToShowInPagination + 1) && <>&hellip;</>}
                    {pagination.totalPages !== 1 && (
                      <button
                        className={styles.pageNumberButton}
                        onClick={() => {
                          setCurrentPage(pagination.totalPages);
                          profileContainerRef.current.scrollTo(0, 0);
                        }}
                        type="button"
                        disabled={
                          pagination.currentPage === pagination.totalPages
                        }
                      >
                        {pagination.totalPages}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setCurrentPage(currentPage + 1);
                        profileContainerRef.current.scrollTo(0, 0);
                      }}
                      disabled={pagination.currentPage === pagination.endPage}
                      type="button"
                      className={styles.paginationArrow}
                    >
                      →
                    </button>
                  </div>
                  <div className={styles.filterButtonContainer}>
                    <Button type="button" onClick={open} fullWidth={false}>
                      <FilterIcon /> Filter
                      {selectedFilters.length > 0 && (
                        <>
                          <span>·</span> <span>{selectedFilters.length}</span>
                        </>
                      )}
                    </Button>
                  </div>
                </>
              ) : (
                <div>There are no designers that match these filters.</div>
              )}
            </>
          )}
          <div>
            <DialogOverlay isOpen={showDialog} onDismiss={close}>
              <DialogContent aria-label="Filter designers">
                <div className={styles.dialogHeader}>
                  <ClickableBox className={styles.closeButton} onClick={close}>
                    <span aria-hidden>
                      <CloseIcon />
                    </span>
                  </ClickableBox>
                  <h2>Filter</h2>
                  <button
                    onClick={() => {
                      setSelectedFilters([]);
                      setCurrentPage(1);
                    }}
                    className={styles.filterClear}
                    type="button"
                    style={{ marginRight: "16px" }}
                  >
                    Clear
                  </button>
                </div>
                <div className={styles.dialogBody}>
                  {filterCategoryTypes.map((section) => {
                    const categoriesInSection = categories.filter(
                      (c) => c[section.id]
                    );
                    const sortedCategoriesInSection = sortBy(
                      categoriesInSection,
                      (category) => category.title
                    );

                    return (
                      <div key={section.id}>
                        <h3 className={styles.filterCategoryTitle}>
                          {section.name}
                        </h3>
                        {sortedCategoriesInSection.map((category) => (
                          <FilterItem
                            key={category.id}
                            id={category.id}
                            type="pill"
                            onChange={(e) => {
                              filterItemOnChange(e, section);
                            }}
                            isChecked={
                              selectedFilters[section.id]?.includes(
                                category.id
                              ) || false
                            }
                            className={styles.filterItemInput}
                            title={category.title}
                          />
                        ))}
                      </div>
                    );
                  })}
                </div>
                <div className={styles.dialogFooter}>
                  <Button type="button" onClick={close}>
                    View {filteredDesigners.length} designer
                    {filteredDesigners.length !== 1 ? "s" : ""}
                  </Button>
                </div>
              </DialogContent>
            </DialogOverlay>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;