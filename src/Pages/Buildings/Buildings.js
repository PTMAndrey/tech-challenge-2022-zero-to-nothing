import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { device } from "../../Components/DevicesSize/Device";
import ButtonComponent from "../../Components/ButtonComponent/ButtonComponent";
import TableSkeleton from "../../Components/TableSkeleton/TableSkeleton";
import endpoints from "../../api/endpoints";
import TableComponent from "../../Components/TableComponent/TableComponent";
import Searchbar from "../../Components/Searchbar/Searchbar";
import BuildingsModal from "../../Components/BuildingsModal/BuildingsModal";






function refreshPage() {
  window.location.reload(false);
}

const Buildings = () => {
  const [onSearch, setOnSearch] = useState("");
  const [onFilter, setOnFilter] = useState("");
  const [dataPending, setDataPending] = useState(false);
  const [openAddModal, setOpenAddModal] = useState();
  const [openDeleteModal, setOpenDeleteModal] = useState();
  const [openEditModal, setOpenEditModal] = useState();
  const [data, setData] = useState();
  const [building, setBuilding] = useState();
  const [refresh, setRefresh] = useState(false);
  const [pagination, setPaginiation] = useState(1);

  useEffect(() => {
    setDataPending(true);
    fetch(endpoints.get_buildings, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => handleGetBuildings(data));
  }, [refresh]);

  const handleGetBuildings = (data) => {
    data.message !== "Unauthorized" && setData({ get_buildings: [...data] });
    setDataPending(false);
  };


  const handleEditOpen = (name) => {
    fetch(endpoints.get_building_by_name + `/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setBuilding(data));
    setOpenEditModal(true);
  };


  const handleEditClose = () => {
    setBuilding();
    setOpenEditModal(false);
  };

  const handleDeleteOpen = (name) => {
    fetch(endpoints.delete_building + `/${name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((response) => console.log("resp", response))
    .then((response) => response.json())
    .then((data) => setBuilding(data));
      
    refreshPage();
  };
  
  const handleAddClose = () => {
    setOpenAddModal(false);
  };

  const handleAddOpen = () => {
    setOpenAddModal(true);
  };

  const onSearchChange = (event) => {
    setOnSearch(event.target.value);
  };

  const onFilterChange = (event) => {
    setOnFilter(event.target.selectedIndex);
  };

  const handleRefreshChange = () => {
    setRefresh(!refresh);
  };

  return (
    <Container>
      <TopTable>
        <ButtonComponent type="submit" onClick={handleAddOpen}>
          Add New
        </ButtonComponent>
        <Searchbar
          searchChange={onSearchChange}
          filterChange={onFilterChange}
          page={"buildings"}
        />
        {/* <ButtonComponent type='submit' >
                    Re-activate
                </ButtonComponent> */}
      </TopTable>

      {dataPending === true ? (
        <TableSkeleton />
      ) : (
        <TableComponent
          data={data?.get_buildings} // ask if first exist an array
          page={"buildings"}
          search={onSearch}
          filter={onFilter - 1}
          //openDeleteModal={handleDeleteOpen}
          openEditModal={handleEditOpen}
          pagination={pagination}
          handleSetPagination={setPaginiation}
          refresh={handleRefreshChange}
        />
      )}
      {openAddModal === true && (
        <BuildingsModal 
          handleClose={handleAddClose}
          open={openAddModal}
          page="add"
          refresh={handleRefreshChange}
        />
      )}
      {openEditModal === true && (
        <BuildingsModal // in progress to be done
          handleClose={handleEditClose}
          open={openEditModal}
          edit={true}
          data={building}
          page="edit"
          refresh={handleRefreshChange}
        />
      )}
    </Container>
  );
};

export default Buildings;

const Container = styled.div`
  max-width: 1160px;
  width: 100%;
  padding: 24px 40px;
  margin: 0 auto;
  min-height: 81%;

  @media ${device.mobileM} {
    padding: 15px;
  }
`;

const TopTable = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  align-items: center;

  @media ${device.mobileM} {
    flex-wrap: wrap;
    justify-content: center;
  }
`;
