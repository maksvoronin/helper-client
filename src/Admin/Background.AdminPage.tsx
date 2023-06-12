import { createRef, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '..';
import $api from '../@http';
import MainLayout from '../@layouts/main.layout';
import { alert } from '../@services/alerting.service';
import { DefaultPage } from '../@types/pageDefault.interface';
import config from '../config';
import s from './adminpage.module.scss';
import { observer } from 'mobx-react';

const BackgroundAdminPage = observer(({ title }: DefaultPage) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    if (!store.isAuth || store.user.permissions < 2) {
      navigate('/');
    }
  }, [store.isAuth, navigate, store.user.permissions]);

  const [name, setName] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<string>('');
  const fileInput: any = createRef();

  useEffect(() => {
    if (fileName) {
      const formData = new FormData();
      formData.append('file', fileInput.current.files[0]);
      formData.append('project', 'helper');
      formData.append('comment', 'User background');
      $api.post(`${config.fileUpload}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(({ data }) => setUploadedFile(data.data.file));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileName]);

  const unlinkFile = (e: any) => {
    e.preventDefault();
    setFileName('');
    setUploadedFile('');
  };

  const sendData = () => {
    if (!name) {
      return alert('error', 'Ошибка', 'Укажите название фона', 15);
    }
    if (!uploadedFile) {
      return alert('error', 'Ошибка', 'Прикрепите фон', 15);
    }

    $api.post(`${config.API}/background/create`, { title: name, type: 'image', content: uploadedFile }).then(({ data }) => {
      alert('default', 'Успешно', 'Фон успешно добавлен', 15);
    });
  };

  return (
    <MainLayout title={title}>
      <div className={s.adminWrapper}>
        <div className={s.adminPage}>
          <h1 className={s.title}>Добавление фона</h1>
          <p>Название фона</p>
          <input placeholder="Название фона" value={name} onChange={({ target }) => setName(target.value)} />
          <label
            className={s.file}
            htmlFor="file"
            onClick={(e) => {
              fileName && unlinkFile(e);
            }}
          >
            {fileName ? 'Открепить файл' : 'Прикрепить файл'}
          </label>
          <input type={'file'} id="file" accept="image/*" onChange={({ target }) => setFileName(target.value)} ref={fileInput} />
          <button onClick={sendData}>Сохранить</button>
        </div>

        {uploadedFile && <img className={s.uploadedBG} src={`${config.API}/public/${uploadedFile}`} alt="" />}
      </div>
    </MainLayout>
  );
});

export default BackgroundAdminPage;
