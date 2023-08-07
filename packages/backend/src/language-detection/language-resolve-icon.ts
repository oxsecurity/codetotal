import iconsMap from "devicon/devicon.json";

export const resolveIcon = (languageName: string): string | undefined => {
  const lcName = languageName.toLowerCase();
  const devIconInfo = iconsMap.find((l) => l.name === lcName);

  if (devIconInfo) {
    return devIconInfo.versions.svg[0];
  }

  return undefined;
};
