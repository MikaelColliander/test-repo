import { styled, useTheme } from "@mui/material/styles";
import React, { FC, useState } from "react";
import MuiSelect, { SelectProps as MuiSelectProps } from "@mui/material/Select";
import { InputLabel, FormControl, InputAdornment } from "@mui/material";
import FormHelperText from "@sj-ab/component-library.ui.form-helper-text";
import ChevronDown from "@sj-ab/component-library.icons.chevron-down";
import SelectSkeleton from "./SelectSkeleton";

const PREFIX = "Select";

const classes = {
  selectDisplay: `${PREFIX}-selectDisplay`,
};

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  [`&.${classes.selectDisplay}`]: {
    "&:focus": {
      backgroundColor: "initial",
    },
  },
  [`& .MuiInputAdornment-root > svg`]: {
    margin: "10px",
  },
  [`& .MuiInputBase-inputAdornedEnd`]: {
    paddingRight: theme.typography.pxToRem(4),
  },
  [`& .MuiInputBase-inputAdornedStart`]: {
    paddingLeft: theme.typography.pxToRem(4),
  },
  [`& .MuiInputAdornment-positionStart`]: {
    marginRight: theme.typography.pxToRem(2),
  },
  [`& .MuiInputBase-adornedStart`]: {
    paddingLeft: theme.typography.pxToRem(6),
  },
  [`& .MuiInputBase-adornedEnd`]: {
    paddingRight: theme.typography.pxToRem(4),
  },
}));

export type SJSelectProps = MuiSelectProps & {
  /* Provide a unique id. This is needed to connect the select with its label for accessibility purposes. */
  labelId: string;
  /* The visible label for the Select */
  labelText: string;
  /* If the control is required or not. If false, an extra text "optional" is inserted into the label */
  required?: boolean;
  /* Language used for internal translations */
  lang?: "sv" | "en";
  /* The Select takes up the entire available width */
  fullWidth?: boolean;
  /* Helper text or error text displayed under the Select */
  helperText?: string;
  /* Provide an icon to be used as startAdornment */
  startIcon?: React.ReactElement;
  /**
   * Add this for testing.
   * Clickable and requested subcomponents will get suffixed with "-[ComponentName]" */
  customAttribute?: { attribute: string; value: string | number };
  /** If loading is true the Select skeleton will be shown. */
  isLoading?: boolean;
};

/**
 *  ### Accessibility
 *  - The Select must have a **unique** `labelId` value for it to work correctly with screen readers
 */
export const Select: FC<SJSelectProps> = ({
  children,
  required = true,
  helperText,
  startIcon,
  lang = "sv",
  labelText,
  fullWidth,
  labelId,
  error,
  disabled,
  isLoading = false,
  onChange,
  customAttribute,
  ...other
}) => {
  const theme = useTheme();
  const [openSelect, setOpenSelect] = useState(false);

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const translations = {
    en: {
      optional: "Optional",
    },
    sv: {
      optional: "Valfritt",
    },
  };

  const getLabel = () => {
    if (!labelText) return undefined;
    return required
      ? labelText
      : `${labelText} (${translations[lang].optional})`;
  };

  const elements = React.Children.toArray(children);

  const customAttributeSuffixSelect = "-Input";

  return isLoading ? (
    <SelectSkeleton fullWidth={fullWidth} />
  ) : (
    <StyledFormControl
      {...(customAttribute && {
        [customAttribute.attribute]: customAttribute.value,
      })}
      fullWidth={fullWidth}
      variant="outlined"
    >
      <InputLabel
        id={labelId}
        error={error}
        className={disabled ? "Mui-disabled" : undefined}
        sx={{ lineHeight: "normal" }}
      >
        {getLabel()}
      </InputLabel>
      <MuiSelect
        open={openSelect}
        onOpen={handleOpenSelect}
        onClose={handleCloseSelect}
        id={`${labelId}-select`}
        labelId={labelId}
        onChange={onChange}
        label={getLabel()}
        error={error}
        disabled={disabled}
        IconComponent={ChevronDown}
        startAdornment={
          startIcon ? (
            <InputAdornment position="start" onClick={handleOpenSelect}>
              {startIcon}
            </InputAdornment>
          ) : undefined
        }
        SelectDisplayProps={{
          "aria-describedby": helperText ? `${labelId}-helper` : undefined,
          className: classes.selectDisplay,
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              marginTop: "8px",
              border: `solid ${theme.palette.colors.lightGranite} 1px`,
              boxShadow: "0px 2px 12px rgba(0, 0, 0, 0.1)",
            },
          },
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
        }}
        inputProps={{
          ...(customAttribute && {
            [customAttribute.attribute]: `${customAttribute.value}${customAttributeSuffixSelect}`,
          }),
        }}
        {...other}
      >
        {elements.map((element, index) => {
          return React.isValidElement(element)
            ? React.cloneElement(element as JSX.Element, {
                isLastChild: index === elements.length - 1,
              })
            : null;
        })}
      </MuiSelect>
      {helperText && (
        <FormHelperText
          id={`${labelId}-helper`}
          error={error}
          disabled={disabled}
        >
          {helperText}
        </FormHelperText>
      )}
    </StyledFormControl>
  );
};

export default Select;
