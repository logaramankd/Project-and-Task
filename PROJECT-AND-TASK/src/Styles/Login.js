import { Box, Button, styled, TextField, Typography } from "@mui/material";

export const Container = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '90vh',
    backgroundColor: '#f5f5f5',
})

export const Card = styled(Box)({
  padding: "5rem",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  minWidth: "300px",
  display: "flex",
  flexDirection: "column",
});

export const StyledButton = styled(Button)({
  marginTop: "1rem",
  padding: "0.7rem",
});