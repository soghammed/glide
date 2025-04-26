<?php 

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MacLookupController;

Route::get('/mac-lookup', [MacLookupController::class, 'getVendor'])->name('mac_address.lookup');
Route::post('/mac-lookup', [MacLookupController::class, 'getVendors'])->name('mac_address.lookup.post');