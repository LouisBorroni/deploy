<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('ressource', function (Blueprint $table) {
            // Foreign keys
            $table->foreign('Id_Category')->references('id')->on('category')->onDelete('cascade');
            $table->foreign('Id_RelationType')->references('id')->on('relation_type')->onDelete('cascade');
            $table->foreign('Id_User')->references('Id_User')->on('users')->onDelete('cascade');
        });
        Schema::table('users', function (Blueprint $table) {
            // Foreign keys
            $table->foreign('Id_Role')->references('id')->on('role')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('ressource', function (Blueprint $table) {
            $table->dropForeign(['Id_Category']);
            $table->dropForeign(['Id_RelationType']);
            $table->dropForeign(['Id_User']);
            $table->dropColumn(['Id_Category', 'Id_RelationType', 'Id_User']);
        });
        Schema::table('user', function (Blueprint $table) {
            $table->dropForeign(['Id_Role']);
            $table->dropColumn(['Role',]);
        });
    }
};
