import Skeleton from '@material-ui/lab/Skeleton';
import React from "react";
import styled from "styled-components";

const StyledSkeleton = styled(Skeleton)`
  margin-top: 5px;
  height: 77px !important;
  @media (max-width: 840px) {
    height: 250px !important;
  }
`;

const TableSkeleton = () => {
  return (
    <div>
      <StyledSkeleton variant="rect" />
      <StyledSkeleton variant="rect" />
      <StyledSkeleton variant="rect" />
      <StyledSkeleton variant="rect" />
      <StyledSkeleton variant="rect" />
      <StyledSkeleton variant="rect" />
    </div>
  );
};

export default TableSkeleton;
