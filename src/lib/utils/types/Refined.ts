export type Refined<T extends string | number | symbol | BigInt, K extends string> = T & {
  // eslint-disable-next-line camelcase
  readonly __DO_NOT_USE_THIS_PARAM__brandKey: K;
};

/**
 * example

//
// number
//
type RefinedNumber<K extends string> = Refined<number, K>;

const RefinedNumberFactory = <K extends string>({
  max,
  min,
  int = false,
}: {
  max?: number;
  min?: number;
  int?: boolean;
}) => (n: number) => {
  if ((max && n > max) || (min && n < min)) throw new RangeError('Over');
  if (int && n.toString().includes('.')) throw new TypeError('Not integer');

  return n as RefinedNumber<K>;
};

// Positive と Negative を作成してみる
const positive = RefinedNumberFactory<'Positive'>({ min: 1 });
const negative = RefinedNumberFactory<'Negative'>({ max: 0 });
// 関数だけでなく、値の型も用意しておく
type Positive = ReturnType<typeof positive>;
type Negative = ReturnType<typeof negative>;

// 試しに作成する
const ten = positive(10);
const minusTen = negative(-10);
// const minusTen = negative(10); // これは例外を投げる

// 普通に計算できる（計算結果の型はさすがに number）
const zero = ten - minusTen;

// 試しに Positive だけ受け付ける関数を作成
function getPositive(p: Positive) {
  console.log(p);
}

// OK
getPositive(ten);

// 型エラー
getPositive(minusTen); // Negative はダメ
getPositive(zero); // 素の number もダメ

//
// string
//

type RefinedString<K extends string> = Refined<string, K>;

const RefinedStringFactory = <K extends string>({
  maxLength,
  minLength,
  startsWith,
  endsWith,
  pattern,
}: {
  maxLength?: number;
  minLength?: number;
  startsWith?: string;
  endsWith?: string;
  pattern?: RegExp;
}) => (s: string) => {
  if ((maxLength && s.length > maxLength) || (minLength && s.length < minLength)) throw new RangeError('Over length');
  if (startsWith && !s.startsWith(startsWith)) throw new TypeError('Not startsWith');
  if (endsWith && !s.endsWith(endsWith)) throw new TypeError('Not endsWith');
  if (!pattern?.test(s)) throw new TypeError('Not match');

  return s as RefinedString<K>;
};

// MailAddress と ZipCode
const mailAddress = RefinedStringFactory<'MailAddress'>({ pattern: /^\w\+@\w\.\w$/ });
const zipCode = RefinedStringFactory<'ZipCode'>({ pattern: /^\d{3}-\d{4}$/ });
type MailAddress = ReturnType<typeof mailAddress>;
type ZipCode = ReturnType<typeof zipCode>;

// 試しに作成
const myMailAddress = mailAddress('kyosuke.abe@legalforce.co.jp');
const ukitachoZipCode = zipCode('134-0082');
// const lfTelNo = zipCode('03-6206-6220'); // これは例外を投げる

// 普通に使える（結果はさすがに string）
const combined = myMailAddress + ukitachoZipCode;

// 試しに Positive だけ受け付ける関数を作成
function getMailAddress(s: MailAddress) {
  console.log(s);
}

// 通る
getMailAddress(myMailAddress);

// 型エラー
getMailAddress(ukitachoZipCode); // ZipCode はダメ
getMailAddress(combined); // 素の string もダメ

 */
