import styles from './listItem.module.css';

const listItem = (id, title, content, date) => /* HTML */ `
  <div class="${styles['list-item']}" data-item-id="${id}">
    <div class="${styles['thumbnail-box']}"></div>
    <div class="${styles['info-box']}">
      <div class="${styles.title}">${title}</div>
      <div class="${styles.content}">${content}</div>
      <div class="${styles.date}">${date}</div>
    </div>
  </div>
`;

export default listItem;
