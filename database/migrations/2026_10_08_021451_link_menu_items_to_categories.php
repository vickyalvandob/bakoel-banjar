<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('menu_items', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->constrained('menu_categories')->restrictOnDelete();
            $table->string('seed_key')->nullable()->unique();
        });

        $names = DB::table('menu_items')->distinct()->orderBy('category')->pluck('category');

        foreach ($names as $index => $name) {
            $categoryId = DB::table('menu_categories')->insertGetId([
                'name' => $name,
                'sort_order' => $index + 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            DB::table('menu_items')->where('category', $name)->update(['category_id' => $categoryId]);
        }

        Schema::table('menu_items', function (Blueprint $table) {
            $table->unsignedBigInteger('category_id')->nullable(false)->change();
            $table->dropColumn('category');
        });
    }

    public function down(): void
    {
        Schema::table('menu_items', function (Blueprint $table) {
            $table->string('category', 40)->nullable();
        });

        foreach (DB::table('menu_categories')->get(['id', 'name']) as $category) {
            DB::table('menu_items')->where('category_id', $category->id)->update(['category' => $category->name]);
        }

        Schema::table('menu_items', function (Blueprint $table) {
            $table->string('category', 40)->nullable(false)->change();
            $table->dropConstrainedForeignId('category_id');
            $table->dropUnique(['seed_key']);
            $table->dropColumn('seed_key');
        });
    }
};
