<!doctype html>

<html lang="fr">


    <head>
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/monStyle.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/css/jquery-ui.min.css') }}">

    {!! Html::style('assets/css/bootstrap.min.css') !!}
    {!! Html::style('assets/css/bootstrap.css') !!}
    {!! Html::style('assets/css/monStyle.css') !!}
    {!! Html::style('assets/css/jquery-ui.min.css') !!}
   
  
    </head>
    <body class="body">
        <div class="container">
            <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a id="logo_RessourcesRelationelles" class="navbar-brand" href="#"> <img src="assets/images/logoAPP.PNG" height="50px"></a>
                        
                    </div>
                    @if (Session::get('id') == 0)
                    <div class="collapse navbar-collapse" id="navbar-collapse-target">
                        <ul class="nav navbar-nav navbar-right">                             
                            <li><a href="{{ url('/getLogin') }}" data-toggle="collapse" data-target=".navbar-collapse.in">Se connecter</a></li>
                        </ul> 
                    </div>
                    @endif
                    @if (Session::get('id') > 0)
                    <div class="nav navbar-nav">
                        <li>
                            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" 
                               aria-haspopup="true" aria-expanded="false">Catégorie
                                <span class="caret"></span></a>
                            <ul class="dropdown-menu">
                                <li> <a class="dropdown-item"  href="{{ url('/getListeCategorie') }}">Lister Catégorie</a></li>
                                <li> <a class="dropdown-item" href="{{ url('/getCategorieSport') }}">Sport</a> </li>
                                <li> <a class="dropdown-item" href="{{ url('/getCategorieFamille') }}">Famille</a> </li>     
                            </ul>
                        </li>
                        <li>
                        <a href="{{ url('/getListeRessources') }}" data-toggle="collapse" data-target=".navbar-collapse.in">Ressources</a>
                            
                        </li>
                    </div>


                    <ul class="nav navbar-nav navbar-right">   
                        <div class="dropdown">
                            <a href="#">profile <img src =""></a>
                            <div class="dropdown-content profile-dropdown">
                                <ul>
                                    <li><a href="#">Publications</a></li>
                                    <li><a href="#">Favoris</a></li>
                                    <li><a href="{{ url('/getLogout') }}"data-toggle="collapse" data-target=".navbar-collapse.in">Déconnexion</a></li>
                                </ul>
                            </div>
                        </div>                          
                        
                    </ul> 
                    @endif
                </div><!--/.container-fluid -->
            </nav>
            @yield('content')
        </div>   
        
        {!! Html::script('assets/js/bootstrap.js') !!}
        {!! Html::script('assets/js/bootstrap.min.js') !!}
        {!! Html::script('assets/js/ui-bootstrap-tpls.js')  !!}
        {!! Html::script('assets/js/jquery-3.1.1.js')  !!}
        {!! Html::script('assets/js/jquery-3.3.1.min.js')  !!}
        {!! Html::script('assets/js/jquery-ui.min.js')  !!}
        {!! Html::script('assets/js/npm.js')  !!}
        {!! Html::script('assets/js/bootstrap-hover-dropdown.js')  !!}
        

        <script>

            $(document).ready(function () {
                $("#topbar-container").dropdown();
            });
            $("body").bind("click", function (e) {
                $('.dropdown-toggle, .menu').parent("li").removeClass("open");
            });
            $(".dropdown-toggle, .menu").click(function (e) {
                var $li = $(this).parent("li").toggleClass('open');
                return false;
            });
        </script>
    </body>
</html>




























