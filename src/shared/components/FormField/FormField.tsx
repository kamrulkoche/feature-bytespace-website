import { InputHTMLAttributes } from 'react';

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
};

const FormField = ({ label, id, className = '', ...props }: FormFieldProps) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        className={`h-[52px] w-full rounded-xl border border-surface-line bg-white px-6 text-lg text-ink outline-none transition placeholder:text-ink-faint focus:border-brand focus:ring-2 focus:ring-brand/20 ${className}`}
        {...props}
      />
    </div>
  );
};

export default FormField;
