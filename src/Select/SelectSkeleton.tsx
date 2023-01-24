import React, { FC } from "react";
import MuiSkeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export interface SelectSkeletonProps {
  /* The Select takes up the entire available width */
  fullWidth?: boolean;
}

export const SelectSkeleton: FC<SelectSkeletonProps> = ({ fullWidth }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        border: "1px solid rgba(0, 0, 0, 0.42)",
        borderRadius: "4px",
        height: "56px",
        width: "100%",
        maxWidth: fullWidth ? "100%" : "343px",
        margin: "0",
      }}
    >
      <MuiSkeleton
        variant="rectangular"
        width="120px"
        height="24px"
        sx={{ borderRadius: "4px", marginLeft: "14px", marginY: "18px" }}
      />
    </Box>
  );
};

export default SelectSkeleton;
