/* 게임 데이터 원본 (화면 코드 없음) */
(function (G) {
  G.data.createSeed = function () {
    return {
      baseName: '서울 지하 제3거점',
      resources: { funds: 12400, clues: 38, sanity: 72, parts: 156 },
      sanityMax: 100,
      regions: ['전체', '서울', '경기', '인천'],
      selectedRegion: '전체',
      teamCapacity: 4,
      agents: [
        { id: 'a1', name: '김서연', role: '분석', status: '정상' },
        { id: 'a2', name: '박도윤', role: '현장', status: '정상' },
        { id: 'a3', name: '이하준', role: '통신', status: '피로' },
        { id: 'a4', name: '최민재', role: '현장', status: '정상' },
        { id: 'a5', name: '정하늘', role: '의무', status: '정상' }
      ],
      teamIds: ['a1', 'a2', 'a3'],
      expeditions: [
        {
          id: 'e1', region: '서울', name: '관악구 폐쇄 지하상가',
          total: 690, remaining: 222, stage: '지하 2층 탐색 중', risk: '보통',
          agentIds: ['a1', 'a2', 'a3'],
          reward: { funds: 820, exp: 140, clues: 2, parts: 0 },
          log: [
            { t: '03:12', text: '지하 2층 배전실에서 오래된 출입 기록을 확보했습니다.' },
            { t: '02:05', text: '통신이 끊겼다가 41초 만에 복구되었습니다.' },
            { t: '00:48', text: '지도에 없는 계단 입구를 발견했습니다.' }
          ]
        },
        {
          id: 'e2', region: '경기', name: '안산 폐산업단지 정수장',
          total: 900, remaining: 515, stage: '외곽 수색 중', risk: '높음',
          agentIds: ['a4', 'a5'],
          reward: { funds: 560, exp: 110, clues: 1, parts: 14 },
          log: [
            { t: '05:30', text: '정수조 수면에서 반복되는 파동이 관측되었습니다.' },
            { t: '01:10', text: '현장 인원의 정신력이 소폭 하락했습니다.' }
          ]
        }
      ],
      pendingRewards: [
        { id: 'r1', from: '관악구 지하상가 1차', funds: 820, exp: 140, clues: 2, parts: 0 },
        { id: 'r2', from: '안산 정수장 외곽', funds: 410, exp: 90, clues: 0, parts: 12 },
        { id: 'r3', from: '관악구 지하상가 선발대', funds: 260, exp: 60, clues: 1, parts: 0 }
      ],
      caseFile: {
        title: '지하 3층의 없는 계단',
        clue: '지하 3층 도면에는 없는 계단이 있다',
        detail: '관악구 지하상가 공식 도면은 지하 2층까지만 표기되어 있습니다. 그러나 배전실 출입 기록에는 지하 3층 번호가 남아 있습니다.',
        step: 2,
        steps: ['제보 접수', '현장 도면 대조', '숨겨진 계단 확인', '지하 3층 진입', '원인 규명'],
        collected: ['출입 기록 사본', '도면 불일치 메모', '배전실 사진 3장']
      }
    };
  };
})(window.Game);
