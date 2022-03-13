import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import {device} from '../../Components/DevicesSize/Device';
import ButtonComponent from '../../Components/ButtonComponent/ButtonComponent';
import TableSkeleton from '../../Components/TableSkeleton/TableSkeleton';
import endpoints from '../../api/endpoints';
import TableComponent from '../../Components/TableComponent/TableComponent';
import Searchbar from '../../Components/Searchbar/Searchbar';

const Users = () => {

    const [onSearch, setOnSearch] = useState('');
    const [onFilter, setOnFilter] = useState('');  
    const [dataPending, setDataPending] = useState(false);
    const [openAddModal, setOpenAddModal] = useState();
    const [openEditModal, setOpenEditModal] = useState();
    const [openDeleteModal, setOpenDeleteModal] = useState();
    const [data, setData] = useState();
    const [user, setUser] = useState();
    const [refresh, setRefresh] = useState(false);
    const [pagination, setPaginiation] = useState(1);
    
    useEffect(() => {
        setDataPending(true);
        fetch(endpoints.get_users, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
          .then((response) => response.json())
          .then((data) => handleGetUsers(data));
      }, [refresh]);

    const handleGetUsers = (data) => {
        data.message !== 'Unauthorized' && setData({ get_users : [...data] });
        setDataPending(false);
    };
    const handleDeleteOpen = (email) => {
        fetch(endpoints.get_user + `/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        })
          .then((response) => response.json())
          .then((data) => setUser(data));
        setOpenDeleteModal(true);
      };
    const handleDeleteClose = () => {
        setUser();
        setOpenDeleteModal(false);
    };


    const handleEditOpen = (email) => {
        fetch(endpoints.get_user + `/${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
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
                <ButtonComponent type='submit' onClick={handleAddOpen}>
                    Add New
                </ButtonComponent>
                <Searchbar
                searchChange={onSearchChange}
                filterChange={onFilterChange}
                page={'users'}
                />
                <ButtonComponent type='submit' >
                    Re-activate
                </ButtonComponent>
            
            </TopTable>

            {dataPending === true ? (
                <TableSkeleton/>
            ) : (
                <TableComponent
                    data={data?.get_users} // ask if first exist an array
                    page={'user'}
                    search={onSearch}
                    filter={onFilter - 1}
                    openDeleteModal={handleDeleteOpen}
                    openEditModal={handleEditOpen}
                    pagination={pagination}
                    handleSetPagination={setPaginiation}
                    
                />
            )}

        </Container>
     );
}
 
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