import * as React from "react";
import { alpha, styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import InputBase from '@mui/material/InputBase';
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import SearchIcon from '@mui/icons-material/Search';
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { orderRecord, toggleSidebar } from "@/store/store";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge, { BadgeProps } from '@mui/material/Badge';
const drawerWidth = 240;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 1,
    top: 5,
    padding: '0 4px',
    backgroundColor:"#59d55f"
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  backgroundColor:'rgb(11, 15, 25)',
  minHeight: `calc(100vh - ${theme.spacing(0)})`, height: 'auto'
}));
interface SideBarComponentProps {
  children:React.ReactNode;
}
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor:'rgb(17, 24, 39)'
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));



export default function SideBarComponent({ children }: SideBarComponentProps) {
  const router =useRouter()
  const isSidebarOpen = useSelector((state: any) => state.isSidebarOpen);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [openOrderDialog, setOpenOrderDialog]=React.useState(false)
  const [orderSnackbar, setOrderSnackbar]=React.useState(false)
  const tableData = useSelector((state: any) => state.data);
  const order = useSelector((state: any) => state.order);
  const [hideComponent, setHideComponent]=React.useState(false)
   const handleClick=(url:string)=>{
router.push(url)
   }
  const handleClickOpen = (sum:any) => {
    if(sum){setDialogOpen(true)}
    else{
setOpen(true)

    }
  };
const handleSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setOrderSnackbar(false)
  };
  const handleClose = () => {
    setDialogOpen(false);
    setOpenOrderDialog(false)
  };
  const items = [
    { text: "Starter", url: "/starter/starter" },
    { text: "Main Course", url: "/mainCourse/mainCourse" },
    { text: "Dessert", url: "/dessert/dessert" },
  ];
const orderDialoghandle=()=>{
  setOpenOrderDialog(true)
}
  const orderStatus=(tableData:any)=>{
    setOrderSnackbar(true)
    setDialogOpen(false);
    dispatch(orderRecord(tableData))
  
}
  
  const multiplicationResult:number[]=[]
 { tableData?.map((tableData) => {
    multiplicationResult.push(tableData.price * tableData.count);
  })}
  const sum = multiplicationResult.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  console.log("tabledata",tableData)
console.log("order",order)


  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed"  sx={{ flexGrow: 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => dispatch(toggleSidebar())}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Menu
          </Typography>
          <Button disableRipple disableFocusRipple sx={{padding:"0px 0px"}}onClick={()=>{handleClickOpen(sum)}}>
  <StyledBadge variant="dot"  badgeContent={sum} >
            <ShoppingCartIcon  sx={{color:'white'}} />
             </StyledBadge>
          </Button>
          <Button variant='contained' color='success' onClick={orderDialoghandle} >
My Order
          </Button>
          <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={open} autoHideDuration={1800} onClose={handleSnackbarClose} >
        <Alert severity="error" sx={{ width: '100%' }}>
          Cart is Empty !!
        </Alert>
      </Snackbar>
      <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center' }} open={orderSnackbar} autoHideDuration={2000} onClose={handleSnackbarClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Your Order Placed Successfully !!
        </Alert>
      </Snackbar>
          <Dialog open={dialogOpen} onClose={handleClose} PaperProps={{ style: { minWidth: '800px' } }}>
            <DialogTitle style={{textAlign:"center"}}>My Order</DialogTitle>
            <DialogContent>{tableData?.map((tableData: any,index:any) => (<Box sx={{ display: "flex",alignItems:"center",justifyItems:'center' }} key={tableData.id}>
                <Box
                  style={{
                    width: "100px",
                    height: "90px",
                    border: "2px solid rgb(17, 24, 39)",
                    margin: "15px",
                    position: "relative",
                    borderRadius: "8px",
                  }}
                >
                  <Image
                    src={tableData.imagesrc}
                    fill={true}
                    sizes="10vw"
                    alt="food Image"
                    style={{ borderRadius: "6.5px" }}
                  ></Image>
                </Box>
                <Typography style={{width:"440px",marginRight:'20px'}}>{tableData.title}</Typography>
                <Typography style={{width:"auto",marginRight:'5px'}}>
                  {tableData.price} &times; {tableData.count} =
                </Typography>
                {multiplicationResult[index]}
              </Box>))}
              <Typography style={{width:'inherit',textAlign:'center'}}>Total Payable Amount: {sum} </Typography>
              
            </DialogContent>
            <DialogActions style={{display:'flex', justifyContent: 'center'}}>
              <Button variant='contained' color="error" onClick={handleClose}  style={{margin:'10px'}}>Cancel</Button>
              <Button variant='contained' color="success" onClick={()=>{orderStatus(tableData)}} style={{margin:'10px'}}>Confirm</Button>
            </DialogActions>
          </Dialog>
          
          <Dialog open={openOrderDialog} onClose={handleClose} PaperProps={{ style: { minWidth: '800px' } }}>
            <DialogTitle style={{textAlign:"center"}}>My Order</DialogTitle>
            <DialogContent>
              {order.length?order.map((order: any,index:any) => (<Box style={{margin:'8px 3px',padding:'10px',border:'2px solid rgb(17, 24, 39)', borderRadius:'10px'}} key={index}>
              <Typography style={{textAlign:"center"}} variant='h5'>Order No-{index+1}</Typography>
              {order.map((order:any)=>(<Box sx={{ display: "flex",alignItems:"center",justifyItems:'center' }} key={order.id}>
                <Box
                  style={{
                    width: "100px",
                    height: "90px",
                    border: "2px solid rgb(17, 24, 39)",
                    margin: "15px",
                    position: "relative",
                    borderRadius: "8px",
                  }}
                >
                  <Image
                    src={order.imagesrc}
                    fill={true}
                    sizes="10vw"
                    alt="food Image"
                    style={{ borderRadius: "6.5px" }}
                  ></Image>
                </Box>
                <Typography style={{width:"440px",marginRight:'20px'}}>{order.title}</Typography>
                <Typography style={{width:"auto",marginRight:'5px'}}>
                {order.count} 
                </Typography>
                
                </Box>))}
              
             </Box> )):<Typography style={{textAlign:"center", color:"red"}}>No Order History</Typography>}
            </DialogContent>
          </Dialog>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "rgb(17, 24, 39)",
            color: "white",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
      >
        <DrawerHeader>
          <IconButton
            sx={{ color: "white" }}
            onClick={() => dispatch(toggleSidebar())}
          >
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Menu Items"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClick("/menu/menu");
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {index % 2 === 0 ? <MenuBookIcon /> : <MenuBookIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {items.map(({ text, url }) => (
            <ListItem disablePadding component="a" key={url}>
              <ListItemButton
                onClick={() => {
                  handleClick(url);
                }}
              >
                <ListItemIcon sx={{ color: "white" }}>
                  {text === "Starter" ? <FastfoodIcon /> : <RestaurantIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={isSidebarOpen}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
