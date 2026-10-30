"use client";

import DropdownSelect from "@/components/ui/DropdownSelect";

type SportOption = {
  slug: string;
  name: string;
};

type SportSelectProps = {
  id?: string;
  name: string;
  options: SportOption[];
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
};

export default function SportSelect({
  id = "venue-sport",
  name,
  options,
  value,
  onChange,
  invalid = false,
}: SportSelectProps) {
  return (
    <DropdownSelect
      id={id}
      name={name}
      label="Sport"
      placeholder="Choose a sport"
      variant="field"
      options={options.map((option) => ({
        value: option.slug,
        label: option.name,
      }))}
      value={value}
      onChange={onChange}
      invalid={invalid}
    />
  );
}
