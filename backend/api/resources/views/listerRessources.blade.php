@extends('layouts.master')
@section('content')

<h1>Liste Ressources</h1>
<div class="well">
    <table class="table table-bordered table-striped">
        <thead>
            <tr>
                <th>Id Ressources</th>
                <th>Titre Ressources</th>
                <th>Content Ressources</th>
                
            </tr>
        </thead>
        @foreach($lesRessources as $uneRessources)
        <tr>
            <td>{{$uneRessources->IdRessources}}</td>
            <td><b>{{$uneRessources->TitreRessources}}</b></td>
            <td>{{$uneRessources->ContentRessources}}</td>
            
           
           


        </tr>
        @endforeach
    </table>

</div>

@stop