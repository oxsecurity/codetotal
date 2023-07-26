export const pyCodeSnippet = `
  import pandas as pd
  import requests
  from requests import post
  print(pd.read_csv('1.csv'))
  HEADERS = {
      'Accept': '*/*',
      'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8',
      'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnROYW1lIjoid2ViYXBwLXYzMSIsInNjb3BlIjoic3RhdGljLWNvbnRlbnQtYXBpLGN1cmF0aW9uLWFwaSxuZXh4LWNvbnRlbnQtYXBpLXYzMSx3ZWJhcHAtYXBpIn0.mbuG9wS9Yf5q6PqgR4fiaRFIagiHk9JhwoKES7ksVX4',
  }
  res1 = requests.get('http://pbom.dev/', headers=HEADERS)
  res2 = requests.get('http://ox.security/', allow_redirects=True)
  res3 = requests.get('https://megalinter.io/', verify=False)
`;

export const tsCodeSnippet = `
import iconsMap from "devicon/devicon.json";
export const resolveIcon = (languageName: string): string | undefined => {
  const lcName = languageName.toLowerCase();
  const devIconInfo = iconsMap.find((l) => l.name === lcName);

  if (devIconInfo) {
    return devIconInfo.versions.svg[0];
  }

  return undefined;
};
`;
