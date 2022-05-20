class UtilsClass {
  public static escapeRegExp(value: string): string {
    return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  public static nFormatter(num) {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(2).replace(/\.0$/, '') + 'K';
    }
    return num;
  }
}

export default UtilsClass
