<?php

namespace App\Filament\Admin\Resources;

use App\Filament\Admin\Resources\FileResource\Pages;
use App\Filament\Admin\Resources\FileResource\RelationManagers;
use App\Models\File;
use App\Models\Semester;
use App\Models\Subject;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class FileResource extends Resource
{
    protected static ?string $model = File::class;

    protected static ?string $navigationLabel = "File";

    protected static ?int $navigationSort = 3; //make sure to put at other as well

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('name')
                    ->required()
                    ->live(debounce: 3000)
                    ->afterStateUpdated(function ($state, callable $set) {
                        $set('slug', Str::slug($state));
                    })
                    ->maxLength(255),

                Forms\Components\TextInput::make('slug')
                    ->required()
                    ->maxLength(255),

                Forms\Components\Select::make('semester_id')
                    ->label('Semester')
                    ->options(Semester::all()->pluck('name', 'id'))
                    ->reactive() // make it dynamic
                    ->afterStateUpdated(fn(callable $set) => $set('subject_id', null))
                    ->dehydrated(false),

                Forms\Components\Select::make('subject_id')
                    ->label('Subject')
                    ->options(function (callable $get) {
                        $semesterId = $get('semester_id');
                        if (!$semesterId) {
                            return Subject::pluck('name', 'id'); // or return empty
                        }

                        return Subject::where('semester_id', $semesterId)
                            ->pluck('name', 'id');
                    })


                    ->required(),
                Forms\Components\TextInput::make('url')
                    ->required(),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                //
                Tables\Columns\TextColumn::make('name'),
                Tables\Columns\TextColumn::make('slug'),
                Tables\Columns\TextColumn::make('subject.name'),
                Tables\Columns\TextColumn::make('url'),
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('d-m-Y'),
                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime('d-m-Y'),


            ])
            ->filters([
                //
                Tables\Filters\SelectFilter::make('semester_id')
                    ->label('Semester')
                    ->relationship('subject.semester', 'name'),

                Tables\Filters\SelectFilter::make('subject_id')
                    ->label('Subject')
                    ->relationship('subject', 'name'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFiles::route('/'),
            'create' => Pages\CreateFile::route('/create'),
            'edit' => Pages\EditFile::route('/{record}/edit'),
        ];
    }
}
