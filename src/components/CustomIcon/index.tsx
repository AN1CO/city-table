import { Icon } from "@mui/material";

interface CustomIconProps {
  alt?: string;
  icon: string;
}

export const CustomIcon = ({ icon, alt }: CustomIconProps) => (
  <Icon sx={{ marginX: 0.5, marginBottom: 0.5 }}>
    <img alt={alt} src={icon} />
  </Icon>
);
