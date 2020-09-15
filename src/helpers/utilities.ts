const checkParameter =  (list: Array<string | number>, param: string) => {
    if (list.length > 0) {
      const current: any = list.find((e: any) => e.parameter === param);
      if (current) {
        if (current.value === "1") {
          return true;
        }
        return false;
      }
      return false;
    }
    return false;
  }

  const getParameter = (list: Array<string | number>, parameter: any) => {
    const current: any =  list.find((e: any) => e.parameter === parameter);
    if(current) {
        return current;
    }
    return {};
}  

export default {
    checkParameter,
    getParameter,
}