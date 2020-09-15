export default interface Columns {
  id:
    | "id"
    | "register_date"
    | "attach_file"
    | "confirmation_link"
    | "status"
    | "date_verified"
    | "date_confirmed"
    | "locator"
    | "tournament_id"
    | "user_id"
    | "t_payment_methods_id"
    | "t_categories_groups_id"
    | "user"
    | "tournament"
    | "payment"
    | "nro_comprobante"
    | "fec_pago"
    | "user_notes";
  label: string;
  minWidth?: any;
  align?: "left" | "right" | "center";
  component?: any;
}