import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import usePaginationCall from "../hooks/usePaginationCall";
import { setPage } from "../features/paginationSlice";
import {
  Box,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Pagination from '@mui/material/Pagination';

const PaginationComponent = ({ endpoint, slice, data, query, onPageItems }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getDataByPage } = usePaginationCall();
  const { currentPage, itemsPerPage } = useSelector(
    (state) => state.pagination
  );

  const totalPages = Math.ceil(data?.length / itemsPerPage) || 1;
  const pageFromUrl = Number(searchParams.get("page")) || 1;

  // Mevcut sayfadaki verileri hesaplayalım (frontend pagination)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = data?.slice(startIndex, endIndex) || [];

  useEffect(() => {
    if (!searchParams.get("page")) {
      setSearchParams({ page: 1 }, { replace: true });
    } else {
      dispatch(setPage(pageFromUrl));
      
      // Eğer arama yapılmamışsa backend pagination kullan
      if (!data || data.length === 0) {
        getDataByPage(endpoint, slice, itemsPerPage, pageFromUrl, query);
      }
    }
  // Bağımlılık dizisini düzeltelim - searchParams.toString() kullanarak
  // searchParams nesnesinin değişip değişmediğini kontrol edelim
  }, [searchParams.toString(), endpoint, slice, itemsPerPage, pageFromUrl, query, dispatch, getDataByPage]);

  // Mevcut sayfa verileri değiştiğinde callback'i çağır
  useEffect(() => {
    if (onPageItems && currentPageData.length > 0) {
      onPageItems(currentPageData);
    }
  }, [currentPageData, onPageItems, currentPage]);

  const handlePageChange = (event, page) => {
    if (page > 0 && page <= totalPages) {
      setSearchParams({ page });
      dispatch(setPage(page));
      window.scrollTo({ top: 0, behavior: "smooth" });
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
        Showing {startIndex + 1}-{Math.min(endIndex, data?.length || 0)} of {data?.length || 0} items
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
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default PaginationComponent;
