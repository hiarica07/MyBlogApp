import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import usePaginationCall from "../hooks/usePaginationCall";
import { setPage } from "../features/paginationSlice";
import {
  Box,
  Typography,
//   Pagination,
//   PaginationItem,
//   Button,
} from "@mui/material";
// import {
//   NavigateBefore as NavigateBeforeIcon,
//   NavigateNext as NavigateNextIcon,
// } from "@mui/icons-material";
import Stack from "@mui/material/Stack";
import Pagination from '@mui/material/Pagination';

const PaginationComponent = ({ endpoint, slice, data, query }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getDataByPage } = usePaginationCall();
  const { currentPage, itemsPerPage } = useSelector(
    (state) => state.pagination
  );

//   console.log("`${data}`", data);

  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const pageFromUrl = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: 1 }, { replace: true });
    } else {
      dispatch(setPage(pageFromUrl));
      getDataByPage(endpoint, slice, itemsPerPage, pageFromUrl, query);
    }
  }, [searchParams]);

  const handlePageChange = (event, page) => {
    if (page > 0 && page <= totalPages) {
      setSearchParams({ page });
      dispatch(setPage(page));
    }
  };

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
        Showing {data.length} data from 1 to {data.length}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Stack spacing={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="medium"
            showFirstButton 
            showLastButton
            // renderItem={(item) => (
            //   <PaginationItem
            //     slots={{ previous: NavigateBeforeIcon, next: NavigateNextIcon }}
            //     //   components={{
            //     //     previous: () => (
            //     //       <Button
            //     //         size="small"
            //     //         startIcon={<NavigateBeforeIcon />}
            //     //         disabled={item.disabled}
            //     //       >
            //     //         Previous
            //     //       </Button>
            //     //     ),
            //     //     next: () => (
            //     //       <Button
            //     //         size="small"
            //     //         endIcon={<NavigateNextIcon />}
            //     //         disabled={item.disabled}
            //     //       >
            //     //         Next
            //     //       </Button>
            //     //     ),
            //     //   }}
            //     {...item}
            //     sx={{
            //       "&.Mui-selected": {
            //         bgcolor: "primary.main",
            //         color: "white",
            //         "&:hover": {
            //           bgcolor: "primary.dark",
            //         },
            //       },
            //     }}
            //   />
            // )}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default PaginationComponent;