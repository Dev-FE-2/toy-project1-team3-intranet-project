import listRender from './list/listRender';
import listFunc from './list/listFunc';
import viewRender from './view/viewRender';
import viewFunc from './view/viewFunc';
import formRender from './form/formRender';
import formFunc from './form/formFunc';

const Notice = {
  list: {
    render: listRender,
    init: listFunc,
  },
  view: {
    render: () => viewRender(window.location.pathname.split('/').pop()),
    init: viewFunc,
  },
  form: {
    render: () => {
      const path = window.location.pathname;
      const noticeId = path.includes('/insert') ? null : path.split('/').pop();

      return formRender(noticeId);
    },
    init: formFunc,
  },
};

export default Notice;
