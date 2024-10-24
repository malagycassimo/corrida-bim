class ErrorImpl extends Error {
  code: number;
  reason: string;
  constructor(message: string, code: number, reason: string) {
    super(message);
    this.code = code;
    this.reason = reason;
    Object.setPrototypeOf(this, ErrorImpl.prototype);
  }
}

export { ErrorImpl };