import React, { Component } from 'react';
import { Layout, Menu, Icon, Row, Col, Button } from 'antd';
import { connect } from 'react-redux'
import { Route, Switch, Link, withRouter } from 'react-router-dom'
import Logo from '../../images/logov2.png'
import * as homeActions from './homeActions'
import * as loginActions from '../login/loginActions'
import * as Style from '../../style/home'
import Notificaciones from './notificaciones'
import Espera from '../espera/esperaContainer'
import Visita from '../visita/visitaContainer'
import Activos from '../activos/activosContainer'
import Rechazados from '../rechazados/rechazadosContainer'
import Excluidos from '../excluidos/excluidosContainer'
import Usuarios from '../users/usersContainer'
import '../../style/home.css'
import * as Permisos from '../../assets/permisos' 
const TAB = "TAB"



const { Header, Sider, Content } = Layout;

class homeLayout extends Component {
    state = {
        collapsed: false,
        tab: '1',
        caller:TAB,
        id:""
      };

      toggle = (state) => {
        this.setState({
          collapsed: state,
        });
      }
      changeTab = (tab) => {
        this.setState({
          tab: tab,
        });
      }

  changeCaller = (state) =>{this.setState({caller:state})}
  changeId = (state) =>{this.setState({id:state})}

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
      }
    });
  }
  
  renderEspera = () => {
    return <Espera query={this.props.query} filtro={this.props.filtro} getFiltered={this.props.getFiltered} caller={this.state.caller} searchID={this.state.id} changeId={this.changeId} changeCaller={this.changeCaller}/>
  }

  renderVisita = () => {
    return <Visita query={this.props.query} filtro={this.props.filtro} getFiltered={this.props.getFiltered} caller={this.state.caller} searchID={this.state.id} changeId={this.changeId} changeCaller={this.changeCaller}/>
  }

  renderActivos = () => {
    return <Activos query={this.props.query} filtro={this.props.filtro} getFiltered={this.props.getFiltered} caller={this.state.caller} searchID={this.state.id} changeId={this.changeId} changeCaller={this.changeCaller}/>
  }

  renderRechazados = () => {
    return <Rechazados query={this.props.query} filtro={this.props.filtro} getFiltered={this.props.getFiltered} caller={this.state.caller} searchID={this.state.id} changeId={this.changeId} changeCaller={this.changeCaller}/>
  }

  renderExcluidos = () => {
    return <Excluidos query={this.props.query} filtro={this.props.filtro} getFiltered={this.props.getFiltered} caller={this.state.caller} searchID={this.state.id} changeId={this.changeId} changeCaller={this.changeCaller}/>
  }


      render() {
        return (
          <Layout style={{minHeight:"100vh"}}>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <Row style={Style.logo} type="flex" justify="center"><img style={{height:"3rem",width:"3rem",marginTop:"-.45rem"}} alt="Logo" src={Logo} /></Row>
              <Menu theme="dark" mode="inline" selectedKeys={[this.state.tab]} onClick={(obj)=>{this.changeTab(obj.key)}}>
                <Menu.Item key="1" onClick={()=>this.props.history.push("/Agentes")}>
                  <Link to='/home/espera' onClick={() => this.changeCaller(TAB)}>
                    <Icon type="clock-circle-o" />
                    <span>Espera</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to='/home/visita' onClick={() => this.changeCaller(TAB)}>
                    <Icon type="compass" />
                    <span>Visita</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to='/home/activos' onClick={() => this.changeCaller(TAB)}>
                    <Icon type="check-circle-o" />
                    <span>Activos</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="4" onClick={() => this.changeCaller(TAB)}>
                  <Link to='/home/rechazados'>
                    <Icon type="close-circle-o" />
                    <span>Rechazados</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="5">
                  <Link to='/home/excluidos' onClick={() => this.changeCaller(TAB)}>
                    <Icon type="exclamation-circle-o" />
                    <span>Excluidos</span>
                  </Link>
                </Menu.Item>
                {Permisos.accessUsuario(this.props.usuario.tipo)?<Menu.Item key="6"><Link to='/home/usuarios'><Icon type="team" /><span>Usuarios</span></Link></Menu.Item>:false}
              </Menu>
            </Sider>
            <Layout>
              <Header style={Style.header}>
                <Row type="flex" justify="space-between">
                  <Col>
                    <Icon
                      style={Style.trigger}
                      type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                      onClick={() =>this.toggle(!this.state.collapsed)}
                    />
                  </Col>
                  <Col><Notificaciones getNotificaciones={this.props.getNotificaciones} changeCaller={this.changeCaller}  changeId={this.changeId} deleteNotificacion={this.props.deleteNotificacion} cleanNotificaciones={this.props.cleanNotificaciones} usuario={this.props.usuario} notificaciones={this.props.notificaciones} /><span style={{marginRight:"1rem"}}/><Link to=''><Button shape="circle" type="danger" onClick={()=>{this.props.sessionlogout()}}> <Icon style={{marginRight:"0.9rem"}} type="logout" /></Button></Link><span style={{marginRight:"1rem"}}/></Col>
                </Row>
              </Header>
              <Content style={{...Style.content,minWidth:"70vw"}}>
                <Switch>
                <Route exact path='/home/espera' render={this.renderEspera}/>
                <Route exact path='/home/visita' render={this.renderVisita}/>
                <Route exact path='/home/activos' render={this.renderActivos}/>
                <Route exact path='/home/excluidos' render={this.renderExcluidos}/>
                <Route exact path='/home/rechazados' render={this.renderRechazados}/>
                <Route exact path='/home/usuarios' component={Usuarios}/>
              </Switch>
              </Content>
            </Layout>
          </Layout>
        );
    }
    componentWillMount(){
      switch(window.location.pathname) {
        case "/home/espera":
            this.setState({tab:'1'})
            break;
        case "/home/visita":
          this.setState({tab:'2'})
          break;
        case "/home/activos":
          this.setState({tab:'3'})
          break;  
        case "/home/excluidos":
            this.setState({tab:'5'})
            break;          
        case "/home/rechazados":
          this.setState({tab:'4'})
          break;  
        case "/home/usuarios":
            this.setState({tab:'6'})
            break;        
        default:
            this.props.history.push("/home/espera")
            this.setState({tab:'1'})
      }
    }
    componentDidMount(){
        this.props.loadSessionState()
        this.props.getNotificaciones(this.props.usuario)
        this._mounted = true;
    }
    componentWillUnmount() {
      this._mounted = false;
    }
    componentWillReceiveProps(NextProps) {
      if(NextProps.usuario.token!==this.props.usuario.token){
        
        
        function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        
        async function notificacionesCaller(usuario,getNotificaciones, component) {
          getNotificaciones(usuario)
          await sleep(30000);
          if (component._mounted===false){return}
          notificacionesCaller(usuario,getNotificaciones,component)
        }
        notificacionesCaller(NextProps.usuario, this.props.getNotificaciones, this);
      }
    }
  }
  
  function mapStateToProps(state) {
    return {
      usuario: state.loginReducer.usuario,
      notificaciones: state.homeReducer.notificaciones,
      filtro: state.homeReducer.filtro,
      query: state.homeReducer.query
    }
  }
  
  function mapDispatchToProps(dispatch) {
    return {
      getNotificaciones: (usuario)  => dispatch(homeActions.getNotificaciones(usuario)),
      getFiltered: (usuario,word) => dispatch(homeActions.getFiltered(usuario,word)),
      cleanNotificaciones: (usuario)  => dispatch(homeActions.cleanNotificaciones(usuario)),
      deleteNotificacion: (usuario,notificacion)  => dispatch(homeActions.deleteNotificacion(usuario,notificacion)),
      loadSessionState: () => dispatch(loginActions.loadState()),
      sessionlogout: () => dispatch(loginActions.logout()),
    }
  }
    
    
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(homeLayout))

