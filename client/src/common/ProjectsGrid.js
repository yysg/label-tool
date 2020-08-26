import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Grid, Button, Loader, Header } from 'semantic-ui-react';

export default class ProjectsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      projects: [],
    };

    this.onNewProject = this.onNewProject.bind(this);
  }

  async componentDidMount() {
    try {
      const r = await fetch('/api/projects/');
      if (!r.ok && r.status === 401) {
        window.location = '/admin/login/';
        return;
      }
      const projects = await r.json();
      this.setState({
        isLoaded: true,
        projects,
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        error,
      });
    }
  }

  async onNewProject() {
    const newProjectRes = await fetch('/api/projects', { method: 'POST' });
    const newProject = await newProjectRes.json();
    this.setState({
      projects: this.state.projects.concat([newProject]),
    });
  }

  render() {
    const { error, isLoaded, projects } = this.state;
    const { linkPrefix, newButton, title } = this.props;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Loader active inline="centered" />;
    }

    const renderProjectCard = project => {
      const { id, name, form, imagesCount, labelsCount } = project;
      const info = `${imagesCount} images, ${labelsCount} labeled`;
      const desc = `Tags: ${form.formParts.map(part => part.name).join(', ')}`;
      return (
        <Grid.Column key={id}>
          <Link to={`${linkPrefix}${id}`}>
            <Card fluid link header={name} meta={info} description={desc} />
          </Link>
        </Grid.Column>
      );
    };

    const renderedButton = newButton ? (
      <Button style={{ padding: '1.5em' }} onClick={this.onNewProject}>
        <span style={{ fontSize: '4em' }}>+</span>
        <div>Make a new project</div>
      </Button>
    ) : null;

    return (
      <div>
        <Header as="h1">{title}</Header>
        <Grid stackable columns={2}>
          {projects.map(renderProjectCard)}
          <Grid.Column>{renderedButton}</Grid.Column>
        </Grid>
      </div>
    );
  }
}
