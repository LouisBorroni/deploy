<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id('Id_User');
            $table->string('FirstName_User');
            $table->string('LastName_User');
            $table->string('Email_User')->unique();
            $table->string('Tel_User');
            $table->string('Password_User');
            $table->unsignedBigInteger('Id_Role');
            $table->string('Token_User');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
