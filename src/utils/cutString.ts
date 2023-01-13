interface terminalIndexProps {
  start: number;
  end: number;
  originalString: string | any;
  replaceBy: string;
}
export const cutString = (infoCut: terminalIndexProps): string =>
  infoCut.originalString.slice(0, infoCut.start) +
  infoCut.replaceBy +
  infoCut.originalString.slice(-infoCut.end);
