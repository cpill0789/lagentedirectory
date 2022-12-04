import React, { useState, useEffect, useRef } from "react";
import "reset-css";
import { shuffle, sortBy } from "lodash";
import { graphql } from "gatsby";
import classnames from "classnames";
import Profile from "../components/profile";
import Layout from "../components/layout";
import FilterItem from "../components/filter-item";
import Nav from "../components/nav";
import Loader from "../components/loader";
import paginate from "../paginate";
import * as styles from "./index.module.scss";

const App = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [filterCategories, setFilterCategories] = useState([]);
  const [visibleDesigners, setVisibleDesigners] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  const [isFilterListVisible, setIsFilterListVisible] = useState(false);

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
    const tagCounts = {}

    data.allStrapiDesigner.nodes.forEach(designer => {
      designer.expertise.forEach(item => {
        if (tagCounts[item.id] === undefined) {
          tagCounts[item.id] = 0;
        }
        tagCounts[item.id] += 1;
      });
      
      if (tagCounts[designer.location.id] === undefined) {
        tagCounts[designer.location.id] = 0;
      }
      tagCounts[designer.location.id] += 1;
    });

    const expertise = data.allStrapiExpertise.nodes.map(item => {
      return {
        title: item.Name,
        id: item.id,
        expertise: true,
        totalCount: tagCounts[item.id],
      }
    });
    const location = data.allStrapiLocation.nodes.map(item => {
      return {
        title: item.DisplayName,
        id: item.id,
        location: true,
        totalCount: tagCounts[item.id],
      }
    });
    const shuffledDesigners = shuffle(data.allStrapiDesigner.nodes);

    setFilterCategories([...expertise, ...location]);
    setVisibleDesigners(shuffledDesigners);
    setIsLoading(false);
  }, [data.allStrapiDesigner.nodes, data.allStrapiExpertise.nodes, data.allStrapiLocation.nodes]);

  const numDesignersPerPage = 24;
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
            let attributesToFilter = designer[categoryName];
            if (!Array.isArray(attributesToFilter)) {
              attributesToFilter = [attributesToFilter];
            }
            return attributesToFilter.some((item) => item.id === filter);
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
      <div className={styles.container} style={{backgroundColor: data.allStrapiHome.nodes[0].background || "#000000"}}>
        <div className={styles.sidebar}>
          <Nav
            filter
            theme="dark"
            toggleFilterList={() => {
              setIsFilterListVisible(!isFilterListVisible);
            }}
            isLoading={isLoading}
          />

          <div
            className={classnames({
              [styles.filterContainer]: true,
            })}
          >
            {filterCategoryTypes.map((section) => {
              const categoriesInSection = filterCategories.filter(
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
                      image={designer.ProfileImage}
                      name={designer.Name}
                      description={designer.Description}
                      location={designer.location.DisplayName || "N/A"}
                      key={designer.id}
                      displayUrl={designer.display_url}
                      expandedUrl={designer.expanded_url}
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
                </>
              ) : (
                <div>There are no designers that match these filters.</div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export const pageQuery = graphql`
  query Index {
    allStrapiDesigner {
      nodes {
        Name
        id
        display_url
        expanded_url
        Description
        location {
          DisplayName
          id
        }
        expertise {
          Name
          id
        }
        ProfileImage {
          localFile {
            childImageSharp {
              gatsbyImageData(height: 200)
            }
          }
        }
      }
    }
    allStrapiExpertise {
      nodes {
        Name
        id
      }
    }
    allStrapiLocation {
      nodes {
        DisplayName
        id
      }
    }
    allStrapiHome {
      nodes {
        background
      }
    }
  }
`;

export default App;