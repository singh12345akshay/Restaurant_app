import { Box, Button, Typography } from '@mui/material';
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTableData,
  incrementCount,
  decrementCount,
  addRow,
  deleteRow,
} from "@/store/store";
import data from '../../data/menu_item.json'

interface Iprops{
  foodItem: {
    id:number,
    title:string,
    imagesrc: string,
    price: string,
  }
}
export default function Counter(props: Iprops) {
  const { foodItem } = props
  const tableData = useSelector(selectTableData);
  const dispatch = useDispatch();

  const desiredObject = tableData.find((obj: any) => obj.id === foodItem.id);
  const handleAddRow = (foodItem:any) => {
    if (!tableData.find((obj:any) => obj.id === foodItem.id)) {
      const newRow = {
        id: foodItem.id,
        title: foodItem.title,
        imagesrc: foodItem.imagesrc,
        price: foodItem.price,
        count: 1,
        checked:true
      };
      dispatch(addRow(newRow));
    }
    else {
      dispatch(incrementCount(foodItem.id));
    };
  }
  const handleRemoveRow = (foodItem:any) => {
     if (desiredObject?desiredObject.count === 1:false) {
       dispatch(deleteRow(foodItem.id));
     } else {
       dispatch(decrementCount(foodItem.id));
     };
  }
  return (
    <>
      <Stack direction="row" alignItems="center">
        <Button
          onClick={() => {handleRemoveRow(foodItem)}}
          style={{
            backgroundColor: "rgb(209, 213, 219)",
            color: "rgb(31, 41, 55)",
            borderRadius: "50%",
            minWidth: "10px",
            lineHeight: "0.7",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          -
        </Button>
        <Box 
        display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
          width:'20px',
          margin:'0 5px',
          
        }}>
          <Typography>
          {desiredObject?desiredObject.count:""}
        </Typography>
        </Box>
        <Button
          onClick={() => {
            handleAddRow(foodItem);
          }}
          style={{
            backgroundColor: "rgb(209, 213, 219)",
            color: "rgb(31, 41, 55)",
            borderRadius: "50%",
            minWidth: "5px",
            lineHeight: "0.7",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          +
        </Button>
      </Stack>
    </>
  );
}
