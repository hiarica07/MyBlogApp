import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import usePaginationCall from "../hooks/usePaginationCall";
import { setPage } from "../features/paginationSlice";
import { Box, Typography } from "@mui/material";

import Stack from "@mui/material/Stack";
import Pagination from '@mui/material/Pagination';

// const PaginationComponent = ({ endpoint, slice,  query }) => {
  // const dispatch = useDispatch();
const PaginationComponent = ({ details }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const { getDataByPage } = usePaginationCall();
  // const { currentPage, itemsPerPage, totalRecords } = useSelector(
  // // const { currentPage, itemsPerPage } = useSelector(
  //   (state) => state.pagination
  // );
  // console.log(details);
  

  // // const totalPages = Math.ceil(data?.length / itemsPerPage);
  // const totalPages = Math.ceil(totalRecords / itemsPerPage);

  // const pageFromUrl = Number(searchParams.get("page")) || 1;

  // // useEffect(() => {
  // //   if (!searchParams.get("page")) {
  // //     setSearchParams({ page: 1 }, { replace: true });
  // //   } else {
  // //     dispatch(setPage(pageFromUrl));
  // //     getDataByPage(endpoint, slice, itemsPerPage, pageFromUrl, query);
  // //   }
  // // }, [searchParams]);


  const totalRecords = details?.totalRecords || 0;
  const totalPages = details?.pages?.total !== undefined && details?.pages !== false ? details?.pages?.total : 1;
  const currentPage = searchParams.get("page") ? Number(searchParams.get("page")) : (details?.pages?.current || 1);

  const handlePageChange = (event, page) => {
    if (page > 0 && page <= totalPages) {
      // Update the search params with the new page number
      setSearchParams({ page });
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", page.toString());
      setSearchParams(newParams, { replace: true });
      // dispatch(setPage(page));
    }
  };

  const pageSize = details?.limit || 24
  const startRecord = totalRecords === 0 ? 0 : ((currentPage - 1) * pageSize) + 1;
  const endRecord = Math.min(totalRecords, currentPage * pageSize);

  // console.log("Pagination details", details);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 2,
        mt: 3,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        {/* Showing {totalRecords} data from 1 to {totalRecords} */}
        {totalRecords === 0
          ? "No data to display"
          : `Showing ${startRecord} to ${endRecord} of ${totalRecords} records`}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Stack spacing={2}>
          {
            details?.pages && details?.pages !== false && (

          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="medium"
            showFirstButton 
            showLastButton
            disabled={totalPages === 0}
          />
            )
          }
        </Stack>
      </Box>
    </Box>
  );
};

export default PaginationComponent;
