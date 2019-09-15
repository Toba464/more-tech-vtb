import 'date-fns';
import { endOfDay } from 'date-fns'
import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker
} from '@material-ui/pickers';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Chip from '@material-ui/core/Chip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class Point {
  title = '';
  links = [];
}

export const votingTypes = {
  withTimeBounds: 'withTimeBounds',
  withoutTimeBounds: 'withoutTimeBounds'
};

export const users = [
  {
    name: 'Никита Петров',
    email: 'webnikler@gmail.com',
    role: 'admin',
    id: 1
  },
  {
    name: 'Бабин Анатолий',
    email: 'toba434@gmail.com',
    role: 'admin',
    id: 2
  },
  {
    name: 'Панормов Никита',
    email: 'webnikler@gmail.com',
    role: 'admin',
    id: 3
  },
  {
    name: 'Михаил Мельник',
    email: 'toba434@gmail.com',
    role: 'admin',
    id: 4
  },
  {
    name: 'Михаил Яньшин',
    email: 'webnikler@gmail.com',
    role: 'admin',
    id: 5
  },
  {
    name: 'Директор авахо',
    email: 'toba434@gmail.com',
    role: 'admin',
    id: 6
  },
  {
    name: 'Михаил Яньшин',
    email: 'webnikler@gmail.com',
    role: 'admin',
    id: 7
  },
  {
    name: 'Директор авахо',
    email: 'toba434@gmail.com',
    role: 'admin',
    id: 8
  }
];

const ITEM_HEIGHT = 48;

export default class CreateVoting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageTitle: 'Создание голосования',
      title: '',
      description: '',
      points: [
        {
          title: 'Пункт 1',
          links: [
            {
              title: 'Ссылка 1',
              url: '#'
            },
            {
              title: 'Ссылка 2',
              url: '#'
            }
          ]
        },
        {
          title: 'Пункт 2',
          links: []
        }
      ],
      type: votingTypes.withTimeBounds,
      closedTime: endOfDay(new Date()),
      selectedUsers: [
        {
          name: 'Никита Петров',
          email: 'webnikler@gmail.com',
          role: 'admin',
          id: 1
        },
        {
          name: 'Бабин Анатолий',
          email: 'toba434@gmail.com',
          role: 'admin',
          id: 2
        }
      ],
      usersSelectionAnchorEl: null,
      findUsersText: '',
      creatorLinkModal: {
        refererPointId: null,
        title: '',
        url: ''
      }
    };
  }

  getUsersSelectionList = () => {
    const { selectedUsers } = this.state;
    const bdUsers = [...users];

    return bdUsers.filter(user => !selectedUsers.find(({ id }) => id === user.id));
  };

  renderCreatorLinkModal = () => {
    const {
      creatorLinkModal: {
        refererPointId,
        title,
        url
      },
      creatorLinkModal,
      points
    } = this.state;
    const clearedCreatorLinkModal = {
      refererPointId: null,
      title: '',
      url: ''
    };
    const disabled = !title || !url;
    const handleCreate = () => {
      const linksCopy = [...points[refererPointId].links, { title, url }];
      const pointsCopy = [...points];
      const pointCopy = { ...pointsCopy[refererPointId] };
      pointCopy.links = linksCopy;
      pointsCopy[refererPointId] = pointCopy;

      this.setState({
        creatorLinkModal: clearedCreatorLinkModal,
        points: pointsCopy
      });
    };
    const handleClose = () => {
      this.setState({ creatorLinkModal: clearedCreatorLinkModal });
    };
    const handleKeyChange = (key) => ({ target: { value } }) => {
      this.setState({
        creatorLinkModal: {
          ...creatorLinkModal,
          [key]: value
        }
      });
    };

    return (
      <Dialog open={refererPointId !== null} onClose={handleClose}>
        <DialogTitle>Добавление ссылки</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Название ссылки"
            value={title}
            onChange={handleKeyChange('title')}
            variant="outlined"
            fullWidth
          />
          <TextField
            margin="dense"
            label="url"
            value={url}
            onChange={handleKeyChange('url')}
            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={disabled} onClick={handleCreate} color="primary">
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  renderLinks = (links, pointIndex) => {
    const { points } = this.state;
    const handleDelete = (index) => () => {
      const linksCopy = [...links];
      const pointsCopy = [...points];
      const pointCopy = { ...pointsCopy[pointIndex] };

      linksCopy.splice(index, 1);
      pointCopy.links = linksCopy;
      pointsCopy[pointIndex] = pointCopy;

      this.setState({ points: pointsCopy });
    };
    const handleAddClick = () => {
      this.setState({
        creatorLinkModal: {
          refererPointId: pointIndex
        }
      });
    };
    const handleLinkClick = ({ url }) => () => {
      window.open(url, '_blank');
    };

    return (
      <div style={{ marginTop: 5 }}>
        {links.map((link, i) => (
          <Chip
            style={{ marginRight: 5, marginTop: 10 }}
            onClick={handleLinkClick(link)}
            variant="outlined"
            size="small"
            label={link.title}
            onDelete={handleDelete(i)}
          />
        ))}
        <Chip
          style={{ marginTop: 10 }}
          label="Добавить ссылку"
          onClick={handleAddClick}
          clickable
          size="small"
          color="primary"
        />
        { this.renderCreatorLinkModal() }
      </div>
    );
  };

  renderPointField = (index) => {
    const { points } = this.state;
    const { title, links } = points[index];

    const handleTitleChange = ({target: {value: title}}) => {
      points[index] = { ...points[index], title };
      this.setState({ points });
    };
    const handleRemove = () => {
      const pointsCopy = [...points];
      pointsCopy.splice(index, 1);
      this.setState({ points: pointsCopy });
    };

    return (
      <ListItem key={`point-${index}`}>
        <ListItemText
          primary={
            <TextField
              value={title}
              placeholder="Введите название"
              onChange={handleTitleChange}
              fullWidth
            />
          }
          secondary={this.renderLinks(links, index)}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  renderTitle = () => {
    const { pageTitle } = this.state;

    return (
      <div style={{ padding: '15px' }}>
        <Typography color="textSecondary" variant="h5">{pageTitle}</Typography>
      </div>
    );
  };

  renderTitleField = () => {
    const { title } = this.state;
    const handleChange = ({target: {value: title}}) => {
      this.setState({ title });
    };

    return (
      <div>
        <TextField
          label="Заголовок"
          value={title}
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={handleChange}
        />
      </div>
    );
  };

  renderDescriptionField = () => {
    const { description } = this.state;
    const handleChange = ({target: {value: description}}) => {
      this.setState({ description });
    };

    return (
      <div>
        <TextField
          label="Описание"
          value={description}
          multiline
          rows="8"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={handleChange}
        />
      </div>
    );
  };

  renderPoints = () => {
    const { points } = this.state;
    const handleAddPoint = () => {
      this.setState({ points: [ ...points, new Point() ] })
    };

    return (
      <div style={{ marginTop: '15px' }}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <span>Добавить пункты голосования</span>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={handleAddPoint}
                >
                  <AddIcon /> Добавить
                </Button>
              </Grid>
            </Typography>
            { !!points.length &&
              <List dense>
                {points.map((_, i) => this.renderPointField(i))}
              </List>
            }
          </CardContent>
        </Card>
      </div>
    );
  };

  renderDateTimePickers = () => {
    const { closedTime } = this.state;
    const handleChange = (value) => {
      this.setState({ closedTime: value })
    };

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
          variant="inline"
          margin="normal"
          ampm={false}
          autoOk={true}
          disablePast={true}
          onChange={handleChange}
          value={closedTime}
          format="MM/dd/yyyy HH:mm"
          label="Выберите дату окончания голосования"
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </MuiPickersUtilsProvider>
    );
  };

  renderModeConfigurationBox = () => {
    const { type } = this.state;
    const isWithTimeBounds = type === votingTypes.withTimeBounds;
    const onTypeChange = ({ target: { value: type } }) => {
      this.setState({ type });
    };

    return (
      <div style={{ marginTop: '15px' }}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Выбрать тип голосования
            </Typography>
            <RadioGroup aria-label="type" value={type} onChange={onTypeChange}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
              >
                <FormControlLabel
                  value={votingTypes.withTimeBounds}
                  control={<Radio />}
                  label="Срочное"
                />
                <FormControlLabel
                  value={votingTypes.withoutTimeBounds}
                  control={<Radio />}
                  label="Бессрочное"
                />
              </Grid>

              {isWithTimeBounds && this.renderDateTimePickers()}

            </RadioGroup>
          </CardContent>
        </Card>
      </div>
    );
  };

  renderUser = (user, index) => {
    const { selectedUsers } = this.state;
    const handleRemove = () => {
      selectedUsers.splice(index, 1);
      this.setState({ selectedUsers });
    };

    return (
      <ListItem key={`selected-user-${user.id}`}>
        <ListItemAvatar>
          <Avatar>
            <FaceIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={user.name}
          secondary={user.email}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={handleRemove}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  renderUsers = () => {
    const { selectedUsers } = this.state;
    const usersSelectionList = this.getUsersSelectionList();
    const openUsersSelectionPopup = ({ currentTarget }) => {
      this.setState({ usersSelectionAnchorEl: currentTarget });
    };

    return (
      <div style={{ marginTop: '15px' }}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <span>Добавить участников</span>
                <Button
                  size="small"
                  variant="contained"
                  disabled={!usersSelectionList.length}
                  color="primary"
                  onClick={openUsersSelectionPopup}
                >
                  <AddIcon /> Добавить
                </Button>
                { this.renderUsersSelectionPopup(usersSelectionList) }
              </Grid>
            </Typography>
            {!!selectedUsers.length &&
              <List dense>
                {selectedUsers.map((user, i) => this.renderUser(user, i))}
              </List>
            }
          </CardContent>
        </Card>
      </div>
    );
  };

  renderUsersSelectionPopup = (usersSelectionList) => {
    const { usersSelectionAnchorEl, selectedUsers, findUsersText } = this.state;
    const filteredUsers = usersSelectionList.filter(({ name }) => name.indexOf(findUsersText) !== -1);

    const handleClose = () => {
      this.setState({ usersSelectionAnchorEl: null, findUsersText: '' });
    };
    const handleFindUsersTextChange = ({ target: { value } }) => {
      this.setState({ findUsersText: value });
    };
    const handleItemClick = (user) => () => {
      if (selectedUsers.find(({ id }) => id === user.id)) {
        return;
      }
      this.setState({ selectedUsers: [ ...selectedUsers, user ] }, () => {
        if (!(usersSelectionList.length - 1)) {
          this.setState({ usersSelectionAnchorEl: null });
        }
      });
    };

    return (
      <Menu
        anchorEl={usersSelectionAnchorEl}
        keepMounted
        open={Boolean(usersSelectionAnchorEl)}
        onClose={handleClose}
        disableAutoFocusItem={true}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 6,
            width: 300,
          },
        }}
      >
        { usersSelectionList.length > 5 &&
          <MenuItem>
            <SearchIcon style={{ marginRight: 10 }} />
            <InputBase
              value={findUsersText}
              onChange={handleFindUsersTextChange}
              placeholder="Поиск пользователя"
            />
          </MenuItem>
        }
        {filteredUsers.map((user) => (
          <MenuItem key={`user-${user.id}`} onClick={handleItemClick(user)}>
            <ListItemAvatar>
              <Avatar>
                <FaceIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
          </MenuItem>
        ))}
      </Menu>
    );
  };

  renderCreateButton = () => {
    const {
      title,
      description,
      points,
      type,
      selectedUsers
    } = this.state;
    const disabled = !(
      title && description && points.length && type && selectedUsers.length
    );
    const handleCreate = () => {
      // Тут запрос делаем и редиректим на ID полученной странички голосования
    };

    return (
      <div style={{ marginTop: 30, marginBottom: 20 }}>
        <Button disabled={disabled} onClick={handleCreate} color="primary" variant="contained">
          Создать
        </Button>
      </div>
    );
  };

  render() {
    return (
      <Container maxWidth="sm" style={{ marginTop: '15px', marginBottom: '30px' }}>

        {this.renderTitle()}
        {this.renderTitleField()}
        {this.renderDescriptionField()}
        {this.renderPoints()}
        {this.renderModeConfigurationBox()}
        {this.renderUsers()}
        {this.renderCreateButton()}

      </Container>
    );
  }
}