import styles from './adminAbsence.module.css';
import { renderAdminAbsenceList } from './absenceRender';

let currentSearchType = '';
let currentSearchTerm = '';

export const fetchAdminAbsence = async (page = 1, searchType = '', searchTerm = '') => {
  const url = `/api/admin/absence?page=${page}&searchType=${encodeURIComponent(searchType)}&searchTerm=${encodeURIComponent(searchTerm)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch items');
    return await response.json();
  } catch (error) {
    console.error('Error fetching items:', error);
    return { data: [], page, size: 10, totalCount: 0, totalPage: 1 };
  }
}

const absenceFunc = async () => {
};



export default absenceFunc;
