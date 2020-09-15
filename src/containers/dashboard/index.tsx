import React, { useEffect, FunctionComponent, useCallback, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from '@material-ui/icons/Settings';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from '@material-ui/core/Collapse'
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import _ from 'lodash';
import queryString from "query-string";
import { Grid, Chip } from "@material-ui/core";

import { logout, setForcedLogin, checkLogin, setupInterceptors } from "../../actions/loginActions";
import { getAll as getGenderAll } from "../../actions/genderActions";
import { getAll as getCountries } from "../../actions/countryActions";
import { getList as getMenuList, getWidgetList } from "../../actions/menuActions";
import { getList as getParameterList } from "../../actions/parameterActions";
import { getList as getCategoryList } from "../../actions/tCategoryActions";
import { getList as getCurrencyList } from "../../actions/currencyActions";
import { getList as getRuleTypeList } from "../../actions/tRuleCategoryActions";
import { getList as getPaymentMethodList } from "../../actions/tPaymentMethodActions";
import { getList as getCategoriesGroupList } from "../../actions/tCategoriesGroupActions";
import Loader from "../../components/common/Loader";
import icons from "../../helpers/collectionIcons";
import Helper from '../../helpers/utilities';
import Logo from '../../components/Logo'

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0
      }
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%"
    },
    menuContainer: {
      fontSize: '10px',
    },
    profileButton: {
      background: 'white'
    }
  })
);


interface SubMenuProps {
  menu: Array<string | number>;
  item: any;
}

const SubMenu: FunctionComponent<SubMenuProps> = ({ menu, item }) => {
  const [menuItem, setMenuItem] = useState(null);
  const history = useHistory();
  const findChildrens: any = menu.filter((e: any) => e.parent == item.id);
  let Icon = SettingsIcon;
  if (item.icons) {
    let currenMenutIcon = icons.find((e: any) => e.slug === item.icons.slug);
    if (currenMenutIcon) {
      Icon = currenMenutIcon.name;
    }
  }

  const handleRoute = (path: string) => {
    history.push(path);
  };

  const handleSubMenu = (currentItem: any) => {
    if (menuItem === currentItem) {
      setMenuItem(null);
    } else {
      setMenuItem(currentItem);
    }
  }

  const handleSubMenuOrRoute = useCallback(() => {
    findChildrens.length > 0 ? handleSubMenu(item.id) : handleRoute(item.route ? item.route : '/dashboard/main')
  },
    [item, findChildrens],
  );

  return (
    <React.Fragment key={item.id}>
      <ListItem button onClick={handleSubMenuOrRoute}>
        <ListItemIcon >
          <Icon />
        </ListItemIcon>
        <ListItemText primary={item.name} />
        {findChildrens.length > 0 && (
          item.id === menuItem ? <IconExpandLess /> : <IconExpandMore />
        )
        }
      </ListItem>
      {findChildrens.length > 0 && (
        <Collapse in={item.id === menuItem || false} timeout="auto" unmountOnExit>
          <List dense>
            {findChildrens.map((e: any, i: number) => <SubMenu key={i} menu={menu} item={e} />)}
          </List>
        </Collapse>
      )

      }
    </React.Fragment>
  )
}



interface ResponsiveDrawerProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children?: any;
  container?: Element;
}

export default function Dashboard(props: ResponsiveDrawerProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { container, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [subMenuItem, setSubMenuItem] = React.useState(null);
  const [subMenuItem2, setSubMenuItem2] = React.useState(null);
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    menuReducer: { listData: menuList },
    loginReducer: { user, loading, roles },
    parameterReducer: { listData: parameterList },
    menuReducer: { loading: menuLoading },
  } = useSelector((state: any) => state);

  // const [open1, setOpen1] = React.useState(false);
  // const [open2, setOpen2] = React.useState(false);
  // const [open3, setOpen3] = React.useState(false);
  // const [open4, setOpen4] = React.useState(false);
  // const [open5, setOpen5] = React.useState(false);


  useEffect(() => {
    history.listen((location, action) => {
      if (!_.isEmpty(menuList) && menuList.items.length > 0) {
        const route = location.pathname === '/dashboard' ? '/dashboard/main' : location.pathname;
        const isValid = menuList.items.find((e: any) => e.route === route);
        if (!isValid) {
          window.location.href = "/#/dashboard/main";
        }
      }
    });
  }, [menuList])



  useEffect(() => {

    const checkLoginPromise = new Promise(function (resolve, reject) {
      const values = queryString.parse(location.search);
      if (!_.isEmpty(values) && values.doc_id && values.token) {
        resolve(dispatch(setForcedLogin(values.doc_id, values.token)));
      } else {
        resolve(dispatch(checkLogin()));
      }
      
    });

    checkLoginPromise.then(function () {
      if (location.pathname !== '/') {
        dispatch(setupInterceptors());
      }
      dispatch(getMenuList(location.pathname));
      dispatch(getWidgetList());
      dispatch(getGenderAll());
      dispatch(getCountries());
      dispatch(getParameterList());
      dispatch(getCategoryList());
      dispatch(getCurrencyList());
      dispatch(getRuleTypeList());
      dispatch(getPaymentMethodList());
      dispatch(getCategoriesGroupList());
    });
  }, [dispatch]);



  useEffect(() => {
    if (location.pathname === '/dashboard') {
      history.push('/dashboard/main');
    }
  }, [history, location]);

  // function handleClick(value: number) {
  //   switch (value) {
  //     case 1:
  //       setOpen1(!open1)
  //       break;
  //     case 2:
  //       setOpen2(!open2)
  //       break;
  //     case 3:
  //       setOpen3(!open3)
  //       break;
  //     case 4:
  //       setOpen4(!open4)
  //       break;
  //     case 5:
  //       setOpen5(!open5)
  //       break;
  //     default:
  //       break;
  //   }
  // }

  function setSubMenu(currentItem: any) {
    if (subMenuItem == currentItem) {
      setSubMenuItem(null);
    } else {
      setSubMenuItem(currentItem);
    }
  }

  function build(menu: any) {
    return menu.map((item: any, i: number) => {
      if (item.parent === "0") {
        const findChildrens: any = menu.filter((e: any) => e.parent == item.id);
        let Icon = SettingsIcon;
        if (item.icons) {
          let currenMenutIcon = icons.find((e: any) => e.slug === item.icons.slug);
          if (currenMenutIcon) {
            Icon = currenMenutIcon.name;
          }
        }
        return (
          <React.Fragment key={i} >
            <ListItem button onClick={() => findChildrens.length > 0 ? setSubMenu(item.id) : handeClick(item.route ? item.route : '')}>
              <ListItemIcon >
                <Icon />
              </ListItemIcon>
              <ListItemText primary={item.name} />
              {findChildrens.length > 0 && (
                item.id === subMenuItem ? <IconExpandLess /> : <IconExpandMore />
              )
              }
            </ListItem>
            {findChildrens.length > 0 && (
              <Collapse in={item.id === subMenuItem ? true : false} timeout="auto" unmountOnExit>
                <List dense>
                  {findChildrens.map((e: any, i: number) => <SubMenu key={i} menu={menu} item={e} />)}
                </List>
              </Collapse>
            )

            }
          </React.Fragment>
        )
      }
    })
  }

  function buildMenu(menu: any) {
    return build(menu);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handeClick = (path: string) => {
    history.push(path);
    setAnchorEl(null);
  };

  const handleLogout = () => dispatch(logout());

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const renderMenu = (Icon: React.ReactType, title: string, route: string) => (
    <ListItem button>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        primary={title}
        onClick={() => handeClick(route)}
      />
    </ListItem>
  )

  const renderFirstMenu = (Icon: React.ReactType, title: string, route: string) => (
    <MenuItem>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText
        primary={title}
        onClick={() => handeClick(route)}
      />
    </MenuItem>
  )

  const getRole = (role: string) => !_.isEmpty(user) ? user.roles.find((e: any) => e.slug === role) : '';

  const drawer = () => {
    if (menuLoading) {
      return (
        <div style={{ textAlign: 'center', marginTop: 20 }} >
          <Loader />
        </div>
      )
    }
    return (
      <div>
        <Logo />
        {/* <div className={classes.toolbar} /> */}
        <Divider />
        <List dense >
          {!_.isEmpty(menuList) && buildMenu(menuList.items)}
          {/* {renderFirstMenu(SettingsIcon, "Categoria", "/dashboard/category")}
           {renderFirstMenu(SettingsIcon, "Tipo Categoria", "/dashboard/category-type")}
           {renderFirstMenu(SettingsIcon, "Evento", "/dashboard/tournament")}
           {renderFirstMenu(SettingsIcon, "Inscripcion de Evento", "/dashboard/tournament-new")}
           {renderFirstMenu(SettingsIcon, "Inscripciones de Eventos", "/dashboard/inscriptions")}
           {renderFirstMenu(SettingsIcon, "Reporte Inscripcion de Eventos", "/dashboard/tournament-report")}
           {renderFirstMenu(SettingsIcon, "Grupos", "/dashboard/group")}
          <ListItem button onClick={() => handleClick(3)}>
          <ListItemIcon >
            <LockIcon />
          </ListItemIcon>
          <ListItemText primary="Seguridad" />
          {open3 ? <IconExpandLess /> : <IconExpandMore />}
        </ListItem>

        <Collapse in={open3} timeout="auto" unmountOnExit>
          <List dense>
            {renderFirstMenu(PeopleIcon, "Usuarios", "/dashboard/user")}
            {renderFirstMenu(PeopleIcon, "Roles", "/dashboard/role")}
            {renderFirstMenu(LockIcon, "Permisos", "/dashboard/permission")}
            {renderFirstMenu(DoubleArrowIcon, "Widget", "/dashboard/widget")}
            {renderFirstMenu(DoubleArrowIcon, "Menu", "/dashboard/menu")}
            {renderFirstMenu(DoubleArrowIcon, "Menu Item", "/dashboard/menu-item")}
          </List>
        </Collapse> */}
          {/* {!_.isEmpty(user) && getRole('admin') && (
              <React.Fragment>
                {renderFirstMenu(DashboardIcon, "Inicio", "/dashboard/main")}
                {renderFirstMenu(CommentIcon, "Notas", "")}
                {renderFirstMenu(AccountCircleIcon, "Actualizacion de datos", "/dashboard/actualizacion-datos")}
                {renderFirstMenu(PaymentIcon, "Reporte de Pagos", "/dashboard/reporte-pagos")}
                {renderFirstMenu(PaymentIcon, "Estado de Cuenta", "/dashboard/status-account")}
                {renderFirstMenu(AssignmentLateIcon, "Facturas por Pagar", "/dashboard/facturas-por-pagar")}
              </React.Fragment>
            )
          }
          {
            !_.isEmpty(user) && getRole('promotor') && (
              <React.Fragment>
                {renderFirstMenu(DashboardIcon, "Inicio", "/dashboard/main")}
                {renderFirstMenu(AccountCircleIcon, "Socios", "/dashboard/partner")}
              </React.Fragment>
            )
          } */}
        </List>
      </div>
    )
  };
  const nameRole: any = !_.isEmpty(user) ? _.first(user.roles) : '';
  const client = Helper.getParameter(parameterList, 'CLIENT_NAME')
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.header}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={6} md={6} onClick={() => history.push('/dashboard/main')} style={{ cursor: 'pointer' }}>
                <Typography variant="h6" noWrap >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>Portal de Eventos</Grid>
                  </Grid>
                  <Grid item xs={12} style={{ fontSize: 14, fontStyle: 'italic' }}>{client.value}</Grid>
                </Typography>
              </Grid>

              <Grid item xs={6} sm={6} md={6} style={{ textAlign: 'right' }}>
                <Typography variant="h6" noWrap style={{ lineHeight: 3 }} >
                  <div>
                    <Button
                      startIcon={<AccountCircleIcon />}
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      className={classes.profileButton}
                    >
                      {!loading && user.name}
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem>Usuario: {!loading && user.username}</MenuItem>
                      <MenuItem>Role: {!loading && <Chip label={nameRole.name} color="primary" size="small" />}</MenuItem>
                      <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
                    </Menu>
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer()}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper
            }}
            variant="permanent"
            open
          >
            {drawer()}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children && children}
      </main>
    </div>
  );
}
