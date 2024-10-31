import styles from './listItem.module.css';

const listItem = (id, title, content, date, image) => {
  const imageUrl = image
    ? `background-image: url(data:image/jpeg;base64,${image})`
    : '';
  return /* HTML */ `
    <div class="${styles['list-item']}" data-item-id="${id}">
      <div
        class="${styles['thumbnail-box']} ${!imageUrl ? styles.noimg : ''}"
        style="${imageUrl}"
      ></div>
      <div class="${styles['info-box']}">
        <div class="${styles.title}">${title}</div>
        <div class="${styles.content}">${content}</div>
        <div class="${styles.date}">${date}</div>
      </div>
    </div>
  `;
};

export default listItem;
