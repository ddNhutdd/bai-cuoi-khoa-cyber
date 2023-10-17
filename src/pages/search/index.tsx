import { useEffect, useState } from 'react'
import css from './search.module.scss'
import { useLocation } from 'react-router-dom';
import ListCard from '../../components/list-card/list-card';
import { timKiemKhoaHoc } from '../../services/khoa-hoc.service';
import { Item } from '../../types';

function Search() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('query') || '';

  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await timKiemKhoaHoc(searchQuery, 1, 10); // Thay thế tham số page và pageSize bằng giá trị mong muốn
        setSearchResults(data.items);
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery]);

  
  return (
    <div className={css['search-container']}>
      <h1 className={css['content-search']}>Kết quả tìm kiếm</h1>
      {loading ? (
        <p>Đang tải danh sách sản phẩm...</p>
      ) : (
        <div className={css['list-search']}>
        {Array.isArray(searchResults) && searchResults.length > 0 ? (
          <ListCard list={searchResults} />
        ) : (
          <p className={css['err-search']}>Không tìm thấy kết quả !!!.</p>
        )}
      </div>
      )}
    </div>
  );

}

export default Search
