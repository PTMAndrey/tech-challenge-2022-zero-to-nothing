import React, { useState } from "react";
import styled from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { titles } from "../../Assets/Constants/Constants";
import Pagination from "@material-ui/lab/Pagination";

const TableComponent = (props) => {
  var data = props.data;
  const page = props.page;
  const [pagination, setPagination] = useState(1);

  const handlePaginationChange = (page) => {
    setPagination(page);
  };

  const modifyUsersData = (data) => {
    let datas = [];
    data?.map((elem) =>
      datas.push({
        id: elem.AccountID,
        name: elem.FirstName + " " + elem.LastName,
        type: elem.Role,
        status: elem.AccountStatus,
      })
    );

    console.log("datas\n", datas);
    return datas;
  };

  if (page === "user") {
    data = modifyUsersData(data);
  }

  const search = props.search;
  var filters = props.filter;

  var filtered = [];
  data?.filter(function (value) {
    if (filters > -1) {
      if (
        value[titles[page][filters]]
          .toLowerCase()
          .includes(search?.toLowerCase())
      ) {
         console.log("value", value);
        filtered.push(value);
        
        return 0;
      }
    } else
      titles[page].every((title) => {
        if (value[title]?.toLowerCase().includes(search?.toLowerCase())) {
          filtered.push(value);
          return 0;
        }
        return 1;
      });

    return 1;
  });

  console.log("props issues", props);
  return (
    <PaginationAndTable>
      <Table>
        <Thead>
          <Trr>
            {titles[page].map((elem, key) => (
              <TheadD key={key}>
                {elem.charAt(0).toUpperCase() + elem.slice(1)}
              </TheadD>
            ))}
            {localStorage.getItem("role") === "Administrator" && (
              <TheadD>Quick Actions</TheadD>
            )}
          </Trr>
        </Thead>

        <Tbody>
          {filtered
            .slice((pagination - 1) * 5, (pagination - 1) * 5 + 5)
            .map((elem, key) => (
              <Tr key={key}>
                {titles[page].map((title, key) => (
                  <Td key={key}>
                    {String(elem[`${title}`][0]) +
                      String(elem[`${title}`]).slice(1)}
                  </Td>
                ))}
                {localStorage.getItem("role") === "Administrator" && (
                  <Td>
                  {console.log(elem.Email, "-----\n")}
                    <IconStyled>
                      <BiEditAlt
                        size={24}
                        onClick={() => props.openEditModal(elem.Email)}
                        cursor="pointer"
                      />
                      <RiDeleteBinLine
                        size={24}
                        onClick={() => props.openDeleteModal(elem.Email)}
                        cursor="pointer"
                      />
                    </IconStyled>
                  </Td>
                )}
              </Tr>
            ))}
        </Tbody>
      </Table>
      <StyledPagination
        count={
          filtered.length % 5 === 0
            ? parseInt(filtered.length) / 5
            : parseInt(filtered.length / 5 + 1)
        }
        variant="outlined"
        shape="rounded"
        defaultPage={1}
        onChange={(event, page) => handlePaginationChange(page)}
      />
    </PaginationAndTable>
  );
};

export default TableComponent;

const StyledPagination = styled(Pagination)`
  /* position: absolute;
  bottom: 27px; */
  padding-top: 27px;
`;

const PaginationAndTable = styled.div`
  /* display: flex;
  flex-direction: column;
  min-height: 100%;
  justify-content: space-between; */
`;

const Table = styled.table`
  max-width: 1160px;
  width: 100%;
  border-spacing: initial;
  margin: 0 auto;
  margin-top: 24px;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  height: 80px;
  border: none;
  color: white;
  font-weight: 700;
  tr {
    background-color: #0499ff;
    margin-bottom: 10px;
  }
  @media (max-width: 840px) {
    margin-bottom: 20px;
  }
`;

const Trr = styled.tr`
  @media (max-width: 840px) {
    padding: 20px;
    display: flex;
    flex-direction: column;
    border: none;
    margin-bottom: 0px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  }
`;

const TheadD = styled.td`
  border: 1px solid #0499ff;
  border-bottom: none;
  padding-left: 55px;
  @media (max-width: 840px) {
    text-align: center;
    padding-left: 0px;
    height: 30px;
    font-size: 20px;
  }
`;

const Tbody = styled.tbody`
  font-weight: 400;
`;

const Tr = styled.tr`
  transition: all 0.2s;
  border: 1px solid #62799d;
  background: #ffffff;
  color: #0b2559;
  padding: 25px;

  &:hover {
    td {
      background: #fafafa;
    }
  }

  @media (max-width: 840px) {
    display: flex;
    flex-direction: column;
    border: none;
    margin-bottom: 10px;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
    :hover {
      filter: brightness(0.98);
      td {
        background: #ffffff;
      }
    }
  }
`;

const Td = styled.td`
  padding-left: 55px;
  height: 80px;
  box-sizing: border-box;
  background: #ffffff;

  @media (max-width: 840px) {
    text-align: center;
    padding-left: 0px;
    height: 30px;
    font-size: 20px;
    margin: 0 auto;
  }
`;
const IconStyled = styled.div`
  width: 80px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 840px) {
    margin: 0 auto;
    margin-top: 10px;
  }
`;