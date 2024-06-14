<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('ressource', function (Blueprint $table) {
            $table->id('Id_Ressource');
            $table->string('Title_Ressource');
            $table->string('Description_Ressource');
            $table->longText('Content_Ressource');
            $table->string('Type_Ressource');
            $table->string('State_Ressource');
            $table->boolean('Public_Ressource');
            $table->unsignedBigInteger('Id_Category');
            $table->unsignedBigInteger('Id_RelationType');
            $table->unsignedBigInteger('Id_User');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ressource');
    }
};
