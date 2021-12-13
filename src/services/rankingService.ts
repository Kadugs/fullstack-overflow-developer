import * as rankingRepository from '../repositories/rankingRepository';

async function getRanking() {
  const ranking = await rankingRepository.getTopTenRanking();
  return ranking;
}

export { getRanking };
