import * as React from 'react';
import  { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import '@fontsource/roboto/700.css';
import { Checkbox, styled, TableHead } from '@mui/material';
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Counter from '../counter/counter';
import { addRow, deleteRow, selectTableData } from '@/store/store';

interface ImenuItem{
    id:number,
    title: string,
    imagesrc: string,
    price: string,
  }

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgb(31, 41, 55)",
    fontSize: 16,
    fontWeigth: 700,
    letterSpacing: 0.5,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    backgroundColor: "rgb(17, 24, 39)",
  },
  color: "rgb(209, 213, 219)",
  borderBottom: "1px solid rgb(45, 55, 72)",
  minWidth:'120px'
}));
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  [`&[disabled]`]: {
    color: "white"
  },
  color: "white",
}));
function TablePaginationActions(props: TablePaginationActionsProps): JSX.Element {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };    

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <StyledIconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </StyledIconButton>
      <StyledIconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </StyledIconButton>
      <StyledIconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </StyledIconButton>
      <StyledIconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </StyledIconButton>
    </Box>
  );
}

export default function TableComponent({ item }:ImenuItem[]) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const tableData = useSelector((state: any) => state.data);
  let desiredObject:any;
  let itemID:number;

  const handleCheckboxChange = async(item: any) => {
    desiredObject = tableData.find((obj: any) => obj.id === item.id);
    if (desiredObject) { 
      dispatch(deleteRow(item.id));
    }
    else
    {
      const newRow = {
        id: item.id,
        title: item.title,
        imagesrc: item.imagesrc,
        price: item.price,
        count: 1,
        checked: true,
      };
    dispatch(addRow(newRow));}
    };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - item.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // console.log(tableData)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="TableComponent">
        <TableHead>
          <TableRow>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell>item</StyledTableCell>
            <StyledTableCell >Price</StyledTableCell>
            <StyledTableCell ></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? item.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : item
          ).map((item) => (
            <TableRow key={item.id}>
              <StyledTableCell style={{ width: 90 }}>
                <Checkbox
                  onChange={() => {
                    handleCheckboxChange(item);
                  }}
                  
                  checked={tableData.find((obj: any) => obj.id === item.id)?tableData.find((obj: any) => obj.id === item.id).checked : false}
                  sx={{
                    color: "rgb(237, 242, 247)",
                    "&.Mui-checked": {
                      color: "rgb(237, 242, 247)",
                    },
                  }}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </StyledTableCell>
              <StyledTableCell
                style={{ display: "flex", alignItems: "center" }}
              >
                <Box
                  style={{
                    width: "100px",
                    height: "90px",
                    border: "2px solid white",
                    marginRight: "15px",
                    position: "relative",
                    borderRadius: "8px",
                  }}
                >
                  <Image
                    src={item.imagesrc}
                    fill={true}
                    sizes="10vw"
                    alt="food Image"
                    style={{ borderRadius: "6.5px" }}
                  ></Image>
                </Box>
                {item.title}
              </StyledTableCell>
              <StyledTableCell>{item.price}</StyledTableCell>
              <StyledTableCell>
                {tableData.find((obj: any) => obj.id === item.id) && <Counter foodItem={item} />}
              </StyledTableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <StyledTableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={5}
              count={item.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
              sx={{
                backgroundColor: "rgb(17, 24, 39)",
                borderBottom: "1px solid rgb(45, 55, 72)",
                color: "rgb(237, 242, 247)",
                "& .MuiSvgIcon-root": {
                  color: "white", // Change the color to any desired color
                },
              }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}