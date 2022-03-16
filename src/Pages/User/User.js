import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { device } from "../../Components/DevicesSize/Device";
import ButtonComponent from "../../Components/ButtonComponent/ButtonComponent";
import TableSkeleton from "../../Components/TableSkeleton/TableSkeleton";
import endpoints from "../../api/endpoints";
import TableComponent from "../../Components/TableComponent/TableComponent";
import Searchbar from "../../Components/Searchbar/Searchbar";
import UserModal from "../../Components/UserModal/UserModal";
function refreshPage() {
  window.location.reload(false);
}
const Users = () => {
  const [onSearch, setOnSearch] = useState("");
  const [onFilter, setOnFilter] = useState("");
  const [dataPending, setDataPending] = useState(false);
  const [openAddModal, setOpenAddModal] = useState();
  const [openEditModal, setOpenEditModal] = useState();
  const [data, setData] = useState();
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(false);
  const [pagination, setPaginiation] = useState(1);

  useEffect(() => {
    setDataPending(true);
    fetch(endpoints.get_users, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => handleGetUsers(data));
  }, [refresh]);

  const handleGetUsers = (data) => {
    data.message !== "Unauthorized" && setData({ get_users: [...data] });
    setDataPending(false);
  };
  const handleDeactivateOpen = (email) => {
    fetch(endpoints.deactivate_user + `/${email}`, {
      method: "PUT",
      body: JSON.stringify({
        Status: "Inactive",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data));
    refreshPage();
    setRefresh(true);
  };

  const handleReactivateOpen = (email) => {
    fetch(endpoints.activate_user + `/${email}`, {
      method: "PUT",
      body: JSON.stringify({
        Status: "Active",
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data));
      
    refreshPage();
  };



  const handleEditOpen = (email) => {
    fetch(endpoints.get_user + `/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data));
    setOpenEditModal(true);
  };

  const handleEditClose = () => {
    setUser();
    setOpenEditModal(false);
  };

  const handleAddOpen = () => {
    setOpenAddModal(true);
  };

  const handleAddClose = () => {
    setOpenAddModal(false);
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
          page={"user"}
        />
        {/* <ButtonComponent type='submit' >
                    Re-activate
                </ButtonComponent> */}
      </TopTable>

      {dataPending === true ? (
        <TableSkeleton />
      ) : (
        <TableComponent
          data={data?.get_users} // ask if first exist an array
          page={"user"}
          search={onSearch}
          filter={onFilter - 1}
          openDeactivateModal={handleDeactivateOpen}
          openReactivateModal={handleReactivateOpen}
          openEditModal={handleEditOpen}
          pagination={pagination}
          handleSetPagination={setPaginiation}
          
          refresh={handleRefreshChange}
        />
      )}
      {openAddModal === true && (
        <UserModal  // in progress to be done
          handleClose={handleAddClose}
          open={openAddModal}
          page='add'
          refresh={handleRefreshChange}
        />
      )}
      {openEditModal === true && (
        <UserModal
          handleClose={handleEditClose}
          open={openEditModal}
          edit={true}
          data={user}
          page='edit'
          refresh={handleRefreshChange}
        />
      )}
    </Container>
  );
};

export default Users;

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
