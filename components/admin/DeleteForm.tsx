'use client';

type Action = (formData: FormData) => void | Promise<void>;

/**
 * A delete form with a native confirm() prompt before submission.
 * `className` styles the <button>; `children` is its content.
 */
export function DeleteForm({
  action,
  id,
  confirmMessage,
  className,
  children,
  formClassName,
}: {
  action: Action;
  id: number;
  confirmMessage: string;
  className?: string;
  children: React.ReactNode;
  formClassName?: string;
}) {
  return (
    <form
      action={action}
      className={formClassName}
      onSubmit={(e) => {
        if (!window.confirm(confirmMessage)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className={className}>
        {children}
      </button>
    </form>
  );
}
