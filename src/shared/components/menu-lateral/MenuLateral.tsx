import { Drawer, useTheme, Avatar, Divider, Icon } from "@mui/material";
import { Box } from "@mui/system";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";



export const MenuLateral: React.FC = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <Drawer open={true} variant="permanent">
        <Box
          width={theme.spacing(28)}
          height="100%"
          display="flex"
          flexDirection="column"
        >
          <Box
            width="100%"
            height={theme.spacing(20)}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Avatar
              sx={{ height: theme.spacing(12), width: theme.spacing(12) }}
              alt="Olifrans"
              src="https://media-exp1.licdn.com/dms/image/C4E03AQHQO_-QbxYi8Q/profile-displayphoto-shrink_100_100/0/1632957241631?e=1652918400&v=beta&t=9z1zIxkYa0Vys0sv5aEjVHExNLLfK8Hh5Ku3EMUbMgw"
            />
          </Box>

          <Divider />
          <Box flex={1}>
            <List component="nav">
              <ListItemButton>
                <ListItemIcon>
                    <Icon>home</Icon>                  
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </List>
          </Box>
        </Box>
      </Drawer>

      <Box height="100vh" marginLeft={theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
