# 실제 

- DOM의 실제 수정이 view.js에서 커밋이 되지 않음 

  - 분리된 DOM 요소를 수정하면 성능이 향상 (이 View 함수를 실제 DOM에 연결하고자 컨트롤러를 사용)

- 간단한 렌더링 엔진은 'requestAnimationFrame'을 기반으로 함 

  - 모든 DOM 조작이나 애니메이션은 이 DOM API를 기반으로 해야 함 

  - 이 콜백 내에서 DOM 작업을 수행하면 더 효율적이 됨 

  - 이 API는 메인 스레드를 차단하지 않으며, 다음 repaint가 이벤트 루프에서 스케줄링되기 직전에 실행됨

  

