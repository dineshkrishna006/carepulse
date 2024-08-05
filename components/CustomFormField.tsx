"use client";

import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Input } from "./ui/input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "react-phone-input-2/lib/style.css";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import { E164Number } from "libphonenumber-js/core";
import { date } from "zod";
interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}
const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, iconAlt, iconSrc, placeholder,dateFormat,showTimeSelect,renderSkeleton } = props;
  //   return <Input type="text" placeholder="John Doe" />;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border  border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt}
              height={24}
              width={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src={"/assets/icons/calendar.svg"}
            height={24}
            width={24}
            className="ml-2"
            alt="Calendar"
          />

          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange}
              dateFormat={dateFormat??
                'MM/DD/YYYY'
              }
              showTimeSelect={showTimeSelect??false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return(
        renderSkeleton ? renderSkeleton(field):null
      )
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label,renderSkeleton } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        // <FormItem>
        //   <FormLabel>Username</FormLabel>
        //   <FormControl>
        //     <Input placeholder="shadcn" {...field} />
        //   </FormControl>
        //   <FormDescription>
        //     This is your public display name.
        //   </FormDescription>
        //   <FormMessage />
        // </FormItem>
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
