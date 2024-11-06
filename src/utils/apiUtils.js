import Loader from '../components/loader/Loader';

const loader = new Loader();

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

/**
 * 지정된 시간 내에 fetch 요청 수행
 *
 * @param {string} url - 요청을 보낼 URL
 * @param {Object} options - 요청에 적용할 옵션
 * @param {number} [timeout=5000] - 타임아웃 시간(ms)
 * @returns {Promise<Response>} - fetch 요청의 응답
 * @throws {Error} - 타임아웃이 발생할 경우 에러 발생
 */
const fetchWithTimeout = (url, options, timeout = 5000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), timeout)
    ),
  ]);
};

/**
 * API 요청을 보내는 함수로, 선택적으로 로딩 표시, 타임아웃, 재시도 기능 포함.
 *
 * @param {string} url - 요청을 보낼 URL
 * @param {Object} [options={}] - 요청 설정 옵션
 * @param {string} [options.method='GET'] - HTTP 메서드 ('GET', 'POST', 'PUT', 'DELETE')
 * @param {Object} [options.headers={}] - 요청에 포함할 추가 헤더
 * @param {Object} [options.body=null] - 요청 본문 (POST, PUT, DELETE 메서드에 사용)
 * @param {number} [options.timeout=5000] - 타임아웃 시간(ms)
 * @param {boolean} [options.showLoader=true] - 요청 중 로더를 표시할지 여부
 * @param {number} [options.retries=1] - 요청 실패 시 재시도 횟수
 * @returns {Promise<Object>} - JSON으로 파싱된 응답 데이터 반환하는 Promise
 * @throws {Error} - 모든 재시도가 실패했거나 특정 HTTP 에러 상태 코드가 발생할 경우 에러 발생
 */
const apiRequest = async (
  url,
  {
    method = 'GET',
    headers = {},
    body = null,
    timeout = 5000,
    showLoader = true,
    retries = 1,
  } = {}
) => {
  // FormData일 경우 Content-Type 헤더를 제거
  const isFormData = body instanceof FormData;
  const finalHeaders = isFormData
    ? headers
    : { ...DEFAULT_HEADERS, ...headers };

  // 요청 옵션 설정
  const options = {
    method,
    headers: finalHeaders,
    body: isFormData ? body : body ? JSON.stringify(body) : null,
  };

  if (showLoader) loader.show();

  let attempt = 0;
  let response;

  while (attempt < retries) {
    try {
      // 타임아웃을 적용한 fetch 요청
      response = await fetchWithTimeout(url, options, timeout);

      if (!response.ok) {
        // 상태 코드에 따른 에러 처리
        if (response.status === 401) {
          throw new Error('비인가된 접근입니다. 다시 로그인해주세요.');
        } else if (response.status === 404) {
          throw new Error('해당 리소스를 찾지 못했습니다.');
        } else if (response.status >= 500) {
          throw new Error('서버 에러입니다. 나중에 다시 시도해주세요.');
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`${attempt + 1}번째 시도 실패: ${error.message}`);

      if (attempt + 1 >= retries) {
        throw new Error('여러 시도 끝에 실패하였습니다.');
      }
      attempt++;
    } finally {
      if (showLoader) loader.hide();
    }
  }
};

export { apiRequest };
