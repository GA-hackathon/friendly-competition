// for email validation referenced this: https://www.itsolutionstuff.com/post/react-email-validation-exampleexample.html

export const validEmailPattern = new RegExp(
  /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
);

export let atLeastOneNumber = new RegExp(/(?:[0-9])+/); // https://regexr.com/5jc2s
export let atLeastOneLowerCase = new RegExp(/(?:[a-z])+/); // https://regexr.com/5jc2v
export let atLeastOneUpperCase = new RegExp(/(?:[A-Z])+/); //https://regexr.com/5jc38
export let atLeastOneSpecialCharacter = new RegExp(/(?:[@$!%*?&])+/); // https://regexr.com/5jc35
