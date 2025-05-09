import {LandoToCommit} from "../types/state";

const landoBaseUrl = 'https://api.lando.services.mozilla.com'

async function fetchFromLando(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(
        `Error when requesting treeherder: ${await response.text()}`,
      );
    } else {
      throw new Error(
        `Error when requesting treeherder: (${response.status}) ${response.statusText}`,
      );
    }
  }
  return response;
}


export async function fetchRevisionFromLandoId(
  landoid: string,
) {
  const url = `${landoBaseUrl}/landing_jobs/${landoid}`;
  const response = await fetchFromLando(url);
  return response.json() as Promise<LandoToCommit>;
}